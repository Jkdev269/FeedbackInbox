import React from 'react'
function Footer() {
  return (
    <footer className="bg-slate-900 text-center p-6 border-t border-slate-800 mt-auto ">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-purple-400 font-semibold">Mystery Message</p>
            <p className="text-sm text-slate-400">© 2025 All rights reserved</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer