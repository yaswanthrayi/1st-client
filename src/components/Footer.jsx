export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-2 w-full fixed bottom-0 left-0">
      <div className="px-4">
        <p className="text-xs">
          © {new Date().getFullYear()} Satyamsai  All rights reserved.
        </p>
        <div className="mt-1 flex justify-center gap-4 flex-wrap text-xs">
          <a href="https://www.facebook.com/profile.php?id=100095164723612&rdid=KxrLPlFeABzo7llR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AsYP3GM4p%2F#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Facebook</a>
          <a href="https://www.youtube.com/@satyamsairealestate?si=I7qTVjasMTy7qiNp" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">YouTube</a>
          <a href="mailto:ngopal1969@gmail.com" className="hover:text-blue-300">Email</a>
          <a href="https://wa.me/917032836799" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}