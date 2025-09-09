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

  // Helper function to convert YouTube watch URL to embed URL
  const convertToEmbedUrl = (url) => {
    if (!url) return url;
    
    // Check if it's already an embed URL
    if (url.includes('youtube.com/embed/') || url.includes('youtu.be/embed/')) {
      return url;
    }
    
    // Extract video ID from different YouTube URL formats
    let videoId = null;
    
    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    if (watchMatch) {
      videoId = watchMatch[1];
    }
    
    // Short URL: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (shortMatch) {
      videoId = shortMatch[1];
    }
    
    // Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
    const mobileMatch = url.match(/(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    if (mobileMatch) {
      videoId = mobileMatch[1];
    }
    
    // If we found a video ID, convert to embed URL
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Return original URL if no conversion possible
    return url;
  };

  const handleSaveVideo = async () => {
    if (!videoForm.url.trim() || !videoForm.title.trim()) {
      alert('Please fill in URL and title');
      return;
    }

    // Convert YouTube watch URL to embed URL
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-amber-700">Menu</h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => { setActiveTab('submissions'); setShowMobileMenu(false); }}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors duration-200 ${
                    activeTab === 'submissions' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  Form Submissions
                </button>
                <button
                  onClick={() => { setActiveTab('projects'); setShowMobileMenu(false); }}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors duration-200 ${
                    activeTab === 'projects' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FolderOpen className="w-5 h-5" />
                  Manage Projects
                </button>
                <button
                  onClick={() => { setActiveTab('videos'); setShowMobileMenu(false); }}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors duration-200 ${
                    activeTab === 'videos' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  Manage Videos
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl flex items-center gap-3 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 border border-amber-100">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2 text-sm lg:text-base">
                  {activeTab === 'submissions' ? 'Manage contact form submissions' : 
                   activeTab === 'projects' ? 'Manage project portfolio' : 'Manage video gallery'}
                </p>
              </div>
              
              {/* Desktop Actions */}
              <div className="hidden lg:flex gap-3">
                <button
                  onClick={activeTab === 'submissions' ? fetchSubmissions : activeTab === 'projects' ? fetchProjects : fetchVideos}
                  className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <RefreshCw className={`w-5 h-5 ${loading || projectsLoading || videosLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                {activeTab === 'projects' && (
                  <button
                    onClick={handleAddProject}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Plus className="w-5 h-5" />
                    Add Project
                  </button>
                )}
                {activeTab === 'videos' && (
                  <button
                    onClick={handleAddVideo}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Plus className="w-5 h-5" />
                    Add Video
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-xl shadow-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex mt-6 bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'submissions'
                    ? 'bg-white shadow-md text-amber-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">Form Submissions</span>
                <span className="sm:hidden">Forms</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'projects'
                    ? 'bg-white shadow-md text-amber-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FolderOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Manage Projects</span>
                <span className="sm:hidden">Projects</span>
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'videos'
                    ? 'bg-white shadow-md text-amber-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Upload className="w-5 h-5" />
                <span className="hidden sm:inline">Manage Videos</span>
                <span className="sm:hidden">Videos</span>
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'submissions' ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                  { icon: Mail, label: 'Total', value: getStatsData().total, gradient: 'from-amber-600 to-yellow-500' },
                  { icon: Calendar, label: 'Today', value: getStatsData().today, gradient: 'from-green-600 to-emerald-500' },
                  { icon: User, label: 'This Week', value: getStatsData().thisWeek, gradient: 'from-blue-600 to-indigo-500' },
                  { icon: MessageSquare, label: 'This Month', value: getStatsData().thisMonth, gradient: 'from-purple-600 to-pink-500' }
                ].map((stat, index) => (
                  <div key={index} className={`bg-gradient-to-r ${stat.gradient} text-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1`}>
                    <div className="flex items-center gap-3">
                      <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 opacity-90" />
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold">{stat.value}</h3>
                        <p className="text-xs lg:text-sm opacity-90">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search and Filters */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl p-4 lg:p-6 border border-amber-100">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, subject, or message..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 lg:py-4 border border-amber-200 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={filterPeriod}
                      onChange={(e) => setFilterPeriod(e.target.value)}
                      className="px-4 py-3 lg:py-4 border border-amber-200 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm min-w-32"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Showing {filteredSubmissions.length} of {submissions.length} submissions
                </div>
              </div>

              {/* Submissions Table */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden border border-amber-100">
                <div className="p-4 lg:p-6 border-b border-amber-100">
                  <h2 className="text-xl lg:text-2xl font-bold text-amber-700">Contact Form Submissions</h2>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center p-12 lg:p-16">
                    <RefreshCw className="w-8 h-8 lg:w-12 lg:h-12 animate-spin text-amber-600" />
                    <span className="ml-4 text-gray-600 text-lg">Loading submissions...</span>
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="text-center p-12 lg:p-16">
                    <Mail className="w-16 h-16 lg:w-24 lg:h-24 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No submissions found</h3>
                    <p className="text-gray-500">
                      {searchTerm || filterPeriod !== 'all' ? 'Try adjusting your filters' : 'No contact forms have been submitted yet'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-amber-50 to-yellow-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Phone</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Subject</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-amber-700">Date</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-amber-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-100">
                        {filteredSubmissions.map((submission) => (
                          <tr key={submission.id} className="hover:bg-amber-50/50 transition-colors duration-200">
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{submission.name || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{submission.email || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{submission.phone || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{submission.subject || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(submission.created_at)}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleView(submission)}
                                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(submission.id)}
                                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : activeTab === 'projects' ? (
            <>
              {/* Projects Management */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-amber-100">
                <div className="p-4 lg:p-6 border-b border-amber-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-amber-700">Project Management</h2>
                    <p className="text-gray-600 mt-1">Manage your project portfolio</p>
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add Project</span>
                  </button>
                </div>

                {projectsLoading ? (
                  <div className="flex justify-center items-center py-12 lg:py-20">
                    <RefreshCw className="animate-spin h-8 w-8 text-amber-600" />
                    <span className="ml-4 text-gray-600 text-lg">Loading projects...</span>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center p-12 lg:p-16">
                    <FolderOpen className="w-16 h-16 lg:w-24 lg:h-24 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
                    <p className="text-gray-500 mb-6">Start by adding your first project</p>
                    <button
                      onClick={handleAddProject}
                      className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Plus className="w-5 h-5" />
                      Add Your First Project
                    </button>
                  </div>
                ) : (
                  <div className="p-4 lg:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                          {/* Project Images */}
                          {project.images && project.images.length > 0 && (
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                              {project.images.length > 1 && (
                                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-lg text-sm">
                                  +{project.images.length - 1} more
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{project.title}</h3>
                              <div className="flex gap-2 ml-2">
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                                  title="Edit Project"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            {project.description && (
                              <p className="text-gray-600 text-sm line-clamp-3 mb-3">{project.description}</p>
                            )}
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{formatDate(project.created_at)}</span>
                              {project.images && (
                                <span className="flex items-center gap-1">
                                  <Image className="w-4 h-4" />
                                  {project.images.length} image{project.images.length !== 1 ? 's' : ''}
                                </span>
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
              {/* Videos Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 border border-amber-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Video Gallery Management</h2>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {videos.length} video{videos.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {videosLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {videos.length === 0 ? (
                      <div className="text-center py-20">
                        <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No videos uploaded yet</p>
                        <p className="text-gray-400 mt-2">Click "Add Video" to get started</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                          <div key={video.id} className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200">
                            <div className="relative">
                              {video.url && (
                                <div className="relative pb-[56.25%] h-0">
                                  <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                                    src={video.url}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              )}
                            </div>
                            
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{video.title}</h3>
                                <div className="flex gap-2 ml-2">
                                  <button
                                    onClick={() => handleEditVideo(video)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                                    title="Edit Video"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                                    title="Delete Video"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {video.description && (
                                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{video.description}</p>
                              )}
                              
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{formatDate(video.created_at)}</span>
                                <span className="text-amber-600 font-medium">Video</span>
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

      {/* Submission Details Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold">Submission Details</h3>
                  <p className="opacity-90 mt-1">Complete contact form information</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all duration-200 transform hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-200">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-6 h-6 text-amber-600" />
                    <label className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Full Name</label>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{selectedSubmission.name || 'Not provided'}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <label className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Email Address</label>
                  </div>
                  <p className="text-gray-900 text-lg font-medium break-all">{selectedSubmission.email || 'Not provided'}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-6 h-6 text-green-600" />
                    <label className="text-sm font-semibold text-green-700 uppercase tracking-wide">Phone Number</label>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{selectedSubmission.phone || 'Not provided'}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    <label className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Submitted On</label>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{formatDate(selectedSubmission.created_at)}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                  <label className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Subject</label>
                </div>
                <p className="text-gray-900 text-lg leading-relaxed">{selectedSubmission.subject || 'No subject provided'}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-gray-600" />
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Message</label>
                </div>
                <div className="bg-white rounded-xl p-5 min-h-[120px] shadow-inner border">
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-base">
                    {selectedSubmission.message || 'No message provided'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedSubmission.id);
                    setShowModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <p className="opacity-90 mt-1">
                    {editingProject ? 'Update project information' : 'Create a new project for your portfolio'}
                  </p>
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Project Title *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter project title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Project Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter project description..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Project Images</label>
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div className="flex items-center gap-4">
                    <label className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-2xl cursor-pointer flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Upload className="w-5 h-5" />
                      {uploadingImages ? 'Uploading...' : 'Upload Images'}
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImages}
                      />
                    </label>
                    {uploadingImages && <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />}
                  </div>

                  {/* Image Preview Grid */}
                  {projectForm.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {projectForm.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-xl border border-gray-200"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                  </h3>
                  <p className="opacity-90 mt-1">
                    {editingVideo ? 'Update video information' : 'Add a new video to your gallery'}
                  </p>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all duration-200 transform hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="space-y-6">
                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={videoForm.url}
                    onChange={(e) => setVideoForm({...videoForm, url: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Paste any YouTube URL format - it will be automatically converted for embedding
                  </p>
                  {videoForm.url && convertToEmbedUrl(videoForm.url) !== videoForm.url && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-sm text-green-700">
                        <span className="font-medium">Will be converted to:</span> {convertToEmbedUrl(videoForm.url)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Video Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                    placeholder="Enter video title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Video Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Description
                  </label>
                  <textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                    placeholder="Enter video description..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Video Preview */}
                {videoForm.url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Preview
                    </label>
                    <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden border border-gray-300">
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
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveVideo}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
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
