import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Mail, Phone, User, Calendar, MessageSquare, Eye, Trash2, RefreshCw, Search, Filter, Download, Menu, X, Plus, Edit, Upload, Image, Save, FolderOpen, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions', 'projects', or 'videos'
  
  // Project management states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    images: []
  });
  const [uploadingImages, setUploadingImages] = useState(false);
  
  // Video management states
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoForm, setVideoForm] = useState({
    url: '',
    title: '',
    description: ''
  });
  
  const navigate = useNavigate();
  const { logout } = useAuth();

  // YouTube URL conversion utility
  const convertToEmbedUrl = (url) => {
    if (!url) return '';
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    let videoId = '';
    
    // Extract video ID from various YouTube URL formats
    if (url.includes('youtu.be/')) {
      // https://youtu.be/VIDEO_ID
      videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      // https://www.youtube.com/watch?v=VIDEO_ID
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtube.com/v/')) {
      // https://www.youtube.com/v/VIDEO_ID
      videoId = url.split('v/')[1]?.split('?')[0]?.split('&')[0];
    }
    
    // If we found a video ID, convert to embed URL
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // If it's not a recognized YouTube URL, return original URL
    return url;
  };

  const getVideoThumbnail = (embedUrl) => {
    const videoId = embedUrl.split('/embed/')[1]?.split('?')[0];
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  const isValidYouTubeUrl = (url) => {
    if (!url) return false;
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  useEffect(() => {
    fetchSubmissions();
    fetchProjects();
    fetchVideos();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchTerm, filterPeriod]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      console.log('Fetching submissions...');
      
      const { data, error } = await supabase
        .from('form')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error fetching submissions:', error);
        alert(`Error fetching submissions: ${error.message}`);
      } else {
        console.log(`Found ${data?.length || 0} submissions`);
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Unexpected error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by time period
    if (filterPeriod !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (filterPeriod) {
        case 'today':
          cutoff.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }
      
      if (filterPeriod !== 'all') {
        filtered = filtered.filter(sub => new Date(sub.created_at) >= cutoff);
      }
    }

    setFilteredSubmissions(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        const { error } = await supabase
          .from('form')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting submission:', error);
          alert('Error deleting submission');
        } else {
          setSubmissions(submissions.filter(sub => sub.id !== id));
          alert('Submission deleted successfully');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting submission');
      }
    }
  };

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatsData = () => {
    const total = submissions.length;
    const today = submissions.filter(sub => {
      const submissionDate = new Date(sub.created_at);
      const todayDate = new Date();
      return submissionDate.toDateString() === todayDate.toDateString();
    }).length;
    const thisWeek = submissions.filter(sub => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(sub.created_at) >= weekAgo;
    }).length;
    const thisMonth = submissions.filter(sub => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return new Date(sub.created_at) >= monthAgo;
    }).length;

    return { total, today, thisWeek, thisMonth };
  };

  // Project Management Functions
  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      console.log('Fetching projects from Supabase...');
      console.log('Supabase client config:', {
        url: supabase.supabaseUrl,
        hasKey: !!supabase.supabaseKey
      });

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Projects fetch response:', { data, error });

      if (error) {
        console.error('Error fetching projects:', error);
        alert(`Error fetching projects: ${error.message}`);
      } else {
        console.log(`Found ${data?.length || 0} projects`);
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Unexpected error fetching projects:', error);
      alert(`Unexpected error: ${error.message}`);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      images: []
    });
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      images: project.images || []
    });
    setShowProjectModal(true);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    
    // For demo purposes, we'll use local file URLs
    // In production, you'd upload to Supabase storage
    const imageUrls = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrls.push(e.target.result);
        if (imageUrls.length === files.length) {
          setProjectForm(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls]
          }));
          setUploadingImages(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setProjectForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProject = async () => {
    if (!projectForm.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    console.log('Saving project with form data:', projectForm);
    console.log('Supabase URL:', supabase.supabaseUrl);
    console.log('Editing project:', editingProject);

    try {
      if (editingProject) {
        // Update existing project
        console.log('Updating project with ID:', editingProject.id);
        const { data, error } = await supabase
          .from('projects')
          .update({
            title: projectForm.title,
            description: projectForm.description,
            images: projectForm.images
          })
          .eq('id', editingProject.id);

        console.log('Update response:', { data, error });
        if (error) throw error;
        alert('Project updated successfully');
      } else {
        // Create new project
        console.log('Creating new project...');
        const projectData = {
          title: projectForm.title,
          description: projectForm.description,
          images: projectForm.images
        };
        console.log('Project data to insert:', projectData);

        const { data, error } = await supabase
          .from('projects')
          .insert([projectData]);

        console.log('Insert response:', { data, error });
        if (error) throw error;
        alert('Project created successfully');
      }

      setShowProjectModal(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      alert(`Error saving project: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setProjects(projects.filter(project => project.id !== id));
        alert('Project deleted successfully');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
      }
    }
  };

  // Video Management Functions
  const fetchVideos = async () => {
    try {
      setVideosLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      alert('Error fetching videos');
    } finally {
      setVideosLoading(false);
    }
  };

  const handleAddVideo = () => {
    setEditingVideo(null);
    setVideoForm({
      url: '',
      title: '',
      description: ''
    });
    setShowVideoModal(true);
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setVideoForm({
      url: video.url || '',
      title: video.title || '',
      description: video.description || ''
    });
    setShowVideoModal(true);
  };

  const handleVideoUrlChange = (e) => {
    const inputUrl = e.target.value;
    setVideoForm(prev => ({ ...prev, url: inputUrl }));
  };

  const handleSaveVideo = async () => {
    if (!videoForm.url.trim() || !videoForm.title.trim()) {
      alert('Please fill in URL and title');
      return;
    }

    // Validate YouTube URL
    if (!isValidYouTubeUrl(videoForm.url.trim())) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    // Convert URL to embed format
    const embedUrl = convertToEmbedUrl(videoForm.url.trim());

    try {
      if (editingVideo) {
        // Update existing video
        const { error } = await supabase
          .from('videos')
          .update({
            url: embedUrl,
            title: videoForm.title.trim(),
            description: videoForm.description.trim()
          })
          .eq('id', editingVideo.id);

        if (error) throw error;
        alert('Video updated successfully');
      } else {
        // Create new video
        const { error } = await supabase
          .from('videos')
          .insert({
            url: embedUrl,
            title: videoForm.title.trim(),
            description: videoForm.description.trim()
          });

        if (error) throw error;
        alert('Video added successfully');
      }

      setShowVideoModal(false);
      fetchVideos();
    } catch (error) {
      console.error('Error saving video:', error);
      alert(`Error saving video: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        const { error } = await supabase
          .from('videos')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setVideos(videos.filter(video => video.id !== id));
        alert('Video deleted successfully');
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Error deleting video');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile Menu Overlay - Fixed positioning for better mobile behavior */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto">
            <div className="p-4 safe-top">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Dashboard</h3>
                  <p className="text-xs text-gray-500 mt-1">Navigation & Actions</p>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Navigation</h4>
                <button
                  onClick={() => { setActiveTab('submissions'); setShowMobileMenu(false); }}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 text-left ${
                    activeTab === 'submissions' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm">Form Submissions</div>
                    <div className={`text-xs ${activeTab === 'submissions' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {submissions.length} submissions
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setActiveTab('projects'); setShowMobileMenu(false); }}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 text-left ${
                    activeTab === 'projects' 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FolderOpen className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm">Manage Projects</div>
                    <div className={`text-xs ${activeTab === 'projects' ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {projects.length} projects
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setActiveTab('videos'); setShowMobileMenu(false); }}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 text-left ${
                    activeTab === 'videos' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Upload className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm">Manage Videos</div>
                    <div className={`text-xs ${activeTab === 'videos' ? 'text-purple-100' : 'text-gray-500'}`}>
                      {videos.length} videos
                    </div>
                  </div>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">Quick Actions</h4>
                
                <button
                  onClick={() => {
                    if (activeTab === 'submissions') fetchSubmissions();
                    else if (activeTab === 'projects') fetchProjects();
                    else if (activeTab === 'videos') fetchVideos();
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg"
                >
                  <RefreshCw className={`w-4 h-4 flex-shrink-0 ${(loading || projectsLoading || videosLoading) ? 'animate-spin' : ''}`} />
                  <span className="font-semibold text-sm">Refresh Data</span>
                </button>

                {activeTab === 'projects' && (
                  <button
                    onClick={() => { handleAddProject(); setShowMobileMenu(false); }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white p-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold text-sm">Add New Project</span>
                  </button>
                )}

                {activeTab === 'videos' && (
                  <button
                    onClick={() => { handleAddVideo(); setShowMobileMenu(false); }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold text-sm">Add New Video</span>
                  </button>
                )}
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white p-3 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-lg"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-sm">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 sm:p-4 lg:p-8 safe-area">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Enhanced Header - Mobile Optimized */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-10 border border-white/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            </div>

            <div className="relative">
              {/* Header Top Section */}
              <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                      {activeTab === 'submissions' && <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                      {activeTab === 'projects' && <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                      {activeTab === 'videos' && <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-xl sm:text-2xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                        Admin Dashboard
                      </h1>
                      <div className="flex items-center gap-2 mt-1 sm:mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium truncate">
                          {activeTab === 'submissions' ? 'Contact Form Management' : 
                           activeTab === 'projects' ? 'Project Portfolio Management' : 'Video Gallery Management'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Desktop Actions */}
                <div className="hidden lg:flex gap-4 flex-shrink-0">
                  <button
                    onClick={activeTab === 'submissions' ? fetchSubmissions : activeTab === 'projects' ? fetchProjects : fetchVideos}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold"
                  >
                    <RefreshCw className={`w-6 h-6 ${loading || projectsLoading || videosLoading ? 'animate-spin' : ''}`} />
                    Refresh Data
                  </button>
                  
                  {activeTab === 'projects' && (
                    <button
                      onClick={handleAddProject}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold"
                    >
                      <Plus className="w-6 h-6" />
                      Add Project
                    </button>
                  )}
                  
                  {activeTab === 'videos' && (
                    <button
                      onClick={handleAddVideo}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold"
                    >
                      <Plus className="w-6 h-6" />
                      Add Video
                    </button>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold"
                  >
                    <LogOut className="w-6 h-6" />
                    Sign Out
                  </button>
                </div>

                {/* Enhanced Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="lg:hidden relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-200 transform hover:scale-105 flex-shrink-0"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {activeTab === 'submissions' ? submissions.length : 
                       activeTab === 'projects' ? projects.length : videos.length}
                    </span>
                  </div>
                </button>
              </div>

              {/* Enhanced Tab Navigation - Mobile Optimized */}
              <div className="relative bg-gray-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-inner">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className={`flex-1 py-3 px-2 sm:px-4 sm:py-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 font-semibold text-xs sm:text-sm ${
                      activeTab === 'submissions'
                        ? 'bg-white text-blue-700 shadow-lg transform scale-105 border-2 border-blue-100'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <div className="hidden sm:block min-w-0">
                      <div className="text-xs sm:text-sm">Form Submissions</div>
                      <div className={`text-xs ${activeTab === 'submissions' ? 'text-blue-500' : 'text-gray-400'}`}>
                        {submissions.length} items
                      </div>
                    </div>
                    <span className="sm:hidden text-xs truncate">Forms</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`flex-1 py-3 px-2 sm:px-4 sm:py-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 font-semibold text-xs sm:text-sm ${
                      activeTab === 'projects'
                        ? 'bg-white text-emerald-700 shadow-lg transform scale-105 border-2 border-emerald-100'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                  >
                    <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <div className="hidden sm:block min-w-0">
                      <div className="text-xs sm:text-sm">Manage Projects</div>
                      <div className={`text-xs ${activeTab === 'projects' ? 'text-emerald-500' : 'text-gray-400'}`}>
                        {projects.length} items
                      </div>
                    </div>
                    <span className="sm:hidden text-xs truncate">Projects</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('videos')}
                    className={`flex-1 py-3 px-2 sm:px-4 sm:py-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 font-semibold text-xs sm:text-sm ${
                      activeTab === 'videos'
                        ? 'bg-white text-purple-700 shadow-lg transform scale-105 border-2 border-purple-100'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <div className="hidden sm:block min-w-0">
                      <div className="text-xs sm:text-sm">Manage Videos</div>
                      <div className={`text-xs ${activeTab === 'videos' ? 'text-purple-500' : 'text-gray-400'}`}>
                        {videos.length} items
                      </div>
                    </div>
                    <span className="sm:hidden text-xs truncate">Videos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'submissions' ? (
            <>
              {/* Enhanced Stats Cards - Mobile Optimized */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
                {[
                  { icon: Mail, label: 'Total Submissions', value: getStatsData().total, gradient: 'from-blue-600 via-blue-500 to-indigo-600', shadowColor: 'shadow-blue-200' },
                  { icon: Calendar, label: 'Today', value: getStatsData().today, gradient: 'from-emerald-600 via-green-500 to-teal-600', shadowColor: 'shadow-emerald-200' },
                  { icon: User, label: 'This Week', value: getStatsData().thisWeek, gradient: 'from-purple-600 via-violet-500 to-indigo-600', shadowColor: 'shadow-purple-200' },
                  { icon: MessageSquare, label: 'This Month', value: getStatsData().thisMonth, gradient: 'from-rose-600 via-pink-500 to-red-600', shadowColor: 'shadow-rose-200' }
                ].map((stat, index) => (
                  <div key={index} className={`bg-gradient-to-br ${stat.gradient} text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl ${stat.shadowColor} hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center text-center gap-2 sm:gap-4">
                      <div className="p-2 sm:p-3 lg:p-4 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</h3>
                        <p className="text-xs sm:text-sm lg:text-base opacity-90 font-medium leading-tight">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Search and Filters - Mobile Optimized */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
                <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row">
                  <div className="flex-1 relative group">
                    <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6 group-focus-within:text-blue-600 transition-colors duration-200" />
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 lg:py-5 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm sm:text-base lg:text-lg placeholder-gray-500"
                    />
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    <select
                      value={filterPeriod}
                      onChange={(e) => setFilterPeriod(e.target.value)}
                      className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 lg:py-5 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm sm:text-base lg:text-lg font-medium min-w-32 sm:min-w-40"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 sm:px-4 py-2 rounded-full font-medium">
                    Showing <span className="font-bold text-blue-600">{filteredSubmissions.length}</span> of <span className="font-bold">{submissions.length}</span> submissions
                  </div>
                  {filteredSubmissions.length > 0 && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Real-time data
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Submissions Display - Mobile Optimized */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Contact Form Submissions</h2>
                      <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage and review all incoming contact requests</p>
                    </div>
                    <div className="sm:hidden lg:block">
                      <div className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                        {filteredSubmissions.length} Active
                      </div>
                    </div>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex flex-col justify-center items-center p-12 sm:p-16 lg:p-24">
                    <div className="relative">
                      <RefreshCw className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 animate-spin text-blue-600" />
                      <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-blue-200 rounded-full animate-ping"></div>
                    </div>
                    <div className="mt-6 sm:mt-8 text-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Loading submissions...</h3>
                      <p className="text-gray-500 text-sm sm:text-base">Fetching the latest data from database</p>
                    </div>
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="text-center p-12 sm:p-16 lg:p-24">
                    <div className="relative inline-block">
                      <Mail className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-gray-300 mx-auto mb-6 sm:mb-8" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-xs sm:text-sm font-bold">0</span>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-3 sm:mb-4">No submissions found</h3>
                    <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md mx-auto mb-6">
                      {searchTerm || filterPeriod !== 'all' 
                        ? 'Try adjusting your search filters or time period to see more results' 
                        : 'No contact forms have been submitted yet. Check back later for new submissions.'}
                    </p>
                    {(searchTerm || filterPeriod !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setFilterPeriod('all');
                        }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    {/* Mobile Cards View */}
                    <div className="sm:hidden">
                      <div className="divide-y divide-gray-100">
                        {filteredSubmissions.map((submission, index) => (
                          <div key={submission.id} className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="p-1 bg-blue-100 rounded">
                                      <User className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <span className="font-semibold text-gray-900 text-sm truncate">{submission.name || 'Anonymous'}</span>
                                  </div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="p-1 bg-green-100 rounded">
                                      <Mail className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-xs truncate">{submission.email || 'No email'}</span>
                                  </div>
                                  {submission.phone && (
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="p-1 bg-purple-100 rounded">
                                        <Phone className="w-3 h-3 text-purple-600" />
                                      </div>
                                      <span className="text-gray-700 text-xs">{submission.phone}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                  <button
                                    onClick={() => handleView(submission)}
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-2 rounded-lg transition-all duration-200 shadow-md"
                                    title="View Full Details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(submission.id)}
                                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white p-2 rounded-lg transition-all duration-200 shadow-md"
                                    title="Delete Submission"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-900 font-medium text-sm line-clamp-2">{submission.subject || 'No subject'}</p>
                                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{submission.message || 'No message'}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-amber-100 rounded">
                                    <Calendar className="w-3 h-3 text-amber-600" />
                                  </div>
                                  <span className="text-xs text-gray-500">{formatDate(submission.created_at)}</span>
                                </div>
                                {index === 0 && (
                                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                    Latest
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 lg:px-8 py-4 lg:py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Contact Info</th>
                            <th className="px-6 lg:px-8 py-4 lg:py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Subject</th>
                            <th className="px-6 lg:px-8 py-4 lg:py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Date Received</th>
                            <th className="px-6 lg:px-8 py-4 lg:py-6 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredSubmissions.map((submission, index) => (
                            <tr key={submission.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                              <td className="px-6 lg:px-8 py-4 lg:py-6">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="font-semibold text-gray-900">{submission.name || '-'}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                      <Mail className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">{submission.email || '-'}</span>
                                  </div>
                                  {submission.phone && (
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 bg-purple-100 rounded-lg">
                                        <Phone className="w-4 h-4 text-purple-600" />
                                      </div>
                                      <span className="text-gray-700 text-sm">{submission.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 lg:px-8 py-4 lg:py-6">
                                <div className="max-w-xs">
                                  <p className="text-gray-900 font-medium truncate">{submission.subject || 'No subject'}</p>
                                  <p className="text-gray-500 text-sm mt-1 truncate">{submission.message || 'No message'}</p>
                                </div>
                              </td>
                              <td className="px-6 lg:px-8 py-4 lg:py-6">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-amber-100 rounded-lg">
                                    <Calendar className="w-4 h-4 text-amber-600" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{formatDate(submission.created_at)}</div>
                                    <div className="text-xs text-gray-500">
                                      {index === 0 && 'Latest'} 
                                      {index < 3 && index !== 0 && 'Recent'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 lg:px-8 py-4 lg:py-6">
                                <div className="flex justify-center gap-3">
                                  <button
                                    onClick={() => handleView(submission)}
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-110"
                                    title="View Full Details"
                                  >
                                    <Eye className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(submission.id)}
                                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-110"
                                    title="Delete Submission"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : activeTab === 'projects' ? (
            <>
              {/* Projects Management - Mobile Optimized */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Project Portfolio</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Manage your project showcase and portfolio items</p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-emerald-100 text-emerald-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                        {projects.length} Project{projects.length !== 1 ? 's' : ''}
                      </div>
                      <button
                        onClick={handleAddProject}
                        className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-sm sm:text-base"
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden xs:inline">Add Project</span>
                        <span className="xs:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {projectsLoading ? (
                  <div className="flex flex-col justify-center items-center py-12 sm:py-20 lg:py-32">
                    <div className="relative">
                      <RefreshCw className="animate-spin h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-emerald-600" />
                      <div className="absolute inset-0 h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-4 border-emerald-200 rounded-full animate-ping"></div>
                    </div>
                    <div className="mt-6 sm:mt-8 text-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Loading projects...</h3>
                      <p className="text-gray-500 text-sm sm:text-base">Fetching your portfolio items</p>
                    </div>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center p-12 sm:p-16 lg:p-24">
                    <div className="relative inline-block mb-6 sm:mb-8">
                      <FolderOpen className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-gray-300 mx-auto" />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-600" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-3 sm:mb-4">No projects yet</h3>
                    <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
                      Start building your portfolio by adding your first project. Showcase your best work!
                    </p>
                    <button
                      onClick={handleAddProject}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex items-center gap-3 mx-auto transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-bold text-sm sm:text-base lg:text-lg"
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                      Create Your First Project
                    </button>
                  </div>
                ) : (
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                      {projects.map((project) => (
                        <div key={project.id} className="group bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105">
                          {/* Project Images */}
                          {project.images && project.images.length > 0 && (
                            <div className="relative h-48 sm:h-56 overflow-hidden">
                              <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              {project.images.length > 1 && (
                                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/80 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium">
                                  <Image className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                                  {project.images.length} images
                                </div>
                              )}
                              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-emerald-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                                  PROJECT
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="p-4 sm:p-6">
                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                              <h3 className="font-bold text-lg sm:text-xl text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 flex-1 pr-2">{project.title}</h3>
                              {/* Fixed: Always visible on mobile, hidden on desktop until hover */}
                              <div className="flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-110"
                                  title="Edit Project"
                                >
                                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-110"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                              </div>
                            </div>
                            
                            {project.description && (
                              <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4 leading-relaxed">{project.description}</p>
                            )}
                            
                            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="truncate">{formatDate(project.created_at)}</span>
                              </div>
                              {project.images && project.images.length > 0 && (
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-600 font-medium">
                                  <Image className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {project.images.length} image{project.images.length !== 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : activeTab === 'videos' ? (
            <>
              {/* Enhanced Videos Section - Mobile Optimized */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Video Gallery</h2>
                      <p className="text-gray-600 text-sm sm:text-base">Manage your video content and multimedia portfolio</p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-purple-100 text-purple-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                        {videos.length} Video{videos.length !== 1 ? 's' : ''}
                      </div>
                      <button
                        onClick={handleAddVideo}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-sm sm:text-base"
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden xs:inline">Add Video</span>
                        <span className="xs:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {videosLoading ? (
                  <div className="flex flex-col justify-center items-center py-12 sm:py-20 lg:py-32">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-4 border-purple-600 border-t-transparent"></div>
                      <div className="absolute inset-0 rounded-full h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-4 border-purple-200 animate-ping"></div>
                    </div>
                    <div className="mt-6 sm:mt-8 text-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Loading videos...</h3>
                      <p className="text-gray-500 text-sm sm:text-base">Fetching your video gallery</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 sm:p-6 lg:p-8">
                    {videos.length === 0 ? (
                      <div className="text-center py-12 sm:py-20">
                        <div className="relative inline-block mb-6 sm:mb-8">
                          <Upload className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-gray-300 mx-auto" />
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-3 sm:mb-4">No videos uploaded yet</h3>
                        <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
                          Start building your video gallery by adding your first video. Share your visual stories!
                        </p>
                        <button
                          onClick={handleAddVideo}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex items-center gap-3 mx-auto transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-bold text-sm sm:text-base lg:text-lg"
                        >
                          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                          Upload Your First Video
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {videos.map((video) => (
                          <div key={video.id} className="group bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105">
                            <div className="relative">
                              {video.url && (
                                <div className="relative pb-[56.25%] h-0">
                                  <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={video.url}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              )}
                              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                                  VIDEO
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 sm:p-6">
                              <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <h3 className="font-bold text-lg sm:text-xl text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200 flex-1 pr-2">{video.title}</h3>
                                {/* Fixed: Always visible on mobile, hidden on desktop until hover */}
                                <div className="flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                                  <button
                                    onClick={() => handleEditVideo(video)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-110"
                                    title="Edit Video"
                                  >
                                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-110"
                                    title="Delete Video"
                                  >
                                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {video.description && (
                                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4 leading-relaxed">{video.description}</p>
                              )}
                              
                              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="truncate">{formatDate(video.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600 font-medium">
                                  <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Video Content
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Submission Details Modal - Mobile Optimized */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 sm:p-6 lg:p-8 rounded-t-3xl">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2">Submission Details</h3>
                  <p className="text-blue-100 text-sm sm:text-base lg:text-lg">Complete contact form information and message</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-110 hover:rotate-90 flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-12 space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-blue-100 shadow-lg">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 lg:p-4 bg-blue-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label className="text-xs sm:text-sm font-bold text-blue-700 uppercase tracking-wider">Full Name</label>
                      <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold break-words">{selectedSubmission.name || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-emerald-100 shadow-lg">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 lg:p-4 bg-emerald-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label className="text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-wider">Email Address</label>
                      <p className="text-gray-900 text-base sm:text-lg lg:text-xl font-semibold break-all">{selectedSubmission.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-purple-100 shadow-lg">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 lg:p-4 bg-purple-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label className="text-xs sm:text-sm font-bold text-purple-700 uppercase tracking-wider">Phone Number</label>
                      <p className="text-gray-900 text-base sm:text-lg lg:text-xl font-semibold break-words">{selectedSubmission.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-amber-100 shadow-lg">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 lg:p-4 bg-amber-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wider">Submitted On</label>
                      <p className="text-gray-900 text-base sm:text-lg lg:text-xl font-semibold">{formatDate(selectedSubmission.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-rose-100 shadow-lg">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 lg:p-4 bg-rose-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <label className="text-xs sm:text-sm font-bold text-rose-700 uppercase tracking-wider">Subject Line</label>
                    <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed break-words">{selectedSubmission.subject || 'No subject provided'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-gray-200 shadow-lg">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 lg:p-4 bg-gray-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">Message Content</label>
                </div>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[150px] shadow-inner border-2 border-gray-100">
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-sm sm:text-base lg:text-lg break-words">
                    {selectedSubmission.message || 'No message provided'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t-2 border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                >
                  Close Details
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedSubmission.id);
                    setShowModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  Delete Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal - Mobile Optimized */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 sm:p-6 lg:p-8 rounded-t-3xl">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2">
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h3>
                  <p className="text-emerald-100 text-sm sm:text-base lg:text-lg">
                    {editingProject ? 'Update project information and media' : 'Add a new project to your portfolio showcase'}
                  </p>
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-110 flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-12 space-y-6 sm:space-y-8">
              {/* Title Input */}
              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">Project Title *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a compelling project title..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 lg:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 transition-all duration-200 bg-gray-50"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">Project Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project, technologies used, and key features..."
                  rows={4}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-600 transition-all duration-200 resize-none bg-gray-50"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">Project Images</label>
                <div className="space-y-4 sm:space-y-6">
                  {/* Upload Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <label className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl cursor-pointer flex items-center gap-3 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-sm sm:text-base justify-center sm:justify-start">
                      <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                      {uploadingImages ? 'Uploading Images...' : 'Upload Project Images'}
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImages}
                      />
                    </label>
                    {uploadingImages && (
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-blue-600" />
                        <span className="text-blue-600 font-medium text-sm sm:text-base">Processing images...</span>
                      </div>
                    )}
                  </div>

                  {/* Image Preview Grid */}
                  {projectForm.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                      {projectForm.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-24 sm:h-28 lg:h-32 object-cover rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-200"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg transform hover:scale-110"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t-2 border-gray-200">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal - Mobile Optimized */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6 lg:p-8 rounded-t-3xl">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2">
                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                  </h3>
                  <p className="text-purple-100 text-sm sm:text-base lg:text-lg">
                    {editingVideo ? 'Update video information and content' : 'Add a new video to your multimedia gallery'}
                  </p>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-110 flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-12">
              <div className="space-y-6 sm:space-y-8">
                {/* Video URL */}
                <div>
                  <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
                    Video URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={videoForm.url}
                    onChange={handleVideoUrlChange}
                    placeholder="https://youtu.be/VIDEO_ID or https://www.youtube.com/watch?v=VIDEO_ID"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-200 bg-gray-50"
                  />
                  <div className="mt-3 p-3 sm:p-4 bg-purple-50 rounded-xl sm:rounded-2xl border border-purple-200">
                    <p className="text-xs sm:text-sm text-purple-700 font-medium mb-2">
                      <strong>📺 Supported YouTube URL formats:</strong>
                    </p>
                    <ul className="text-xs sm:text-sm text-purple-600 space-y-1">
                      <li>• https://youtu.be/VIDEO_ID</li>
                      <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
                      <li>• https://www.youtube.com/embed/VIDEO_ID</li>
                    </ul>
                  </div>
                </div>

                {/* Video Title */}
                <div>
                  <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
                    Video Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                    placeholder="Enter a descriptive video title..."
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-200 bg-gray-50"
                  />
                </div>

                {/* Video Description */}
                <div>
                  <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
                    Video Description
                  </label>
                  <textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                    placeholder="Describe what this video is about, key topics covered..."
                    rows={4}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-200 bg-gray-50"
                  />
                </div>

                {/* Video Preview */}
                {videoForm.url && isValidYouTubeUrl(videoForm.url) && (
                  <div>
                    <label className="block text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
                      Video Preview
                    </label>
                    <div className="relative pb-[56.25%] h-0 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-300 shadow-lg">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={convertToEmbedUrl(videoForm.url)}
                        title="Video Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* URL Validation Message */}
                {videoForm.url && !isValidYouTubeUrl(videoForm.url) && (
                  <div className="p-3 sm:p-4 bg-red-50 rounded-xl sm:rounded-2xl border border-red-200">
                    <p className="text-xs sm:text-sm text-red-700 font-medium">
                      <strong>⚠️ Invalid URL:</strong> Please enter a valid YouTube URL. The supported formats are listed above.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t-2 border-gray-200 mt-6 sm:mt-8">
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveVideo}
                  disabled={!isValidYouTubeUrl(videoForm.url) && videoForm.url}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )} 
    </div>
  );
}