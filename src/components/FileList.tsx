'use client';

import { useState } from 'react';
import { FileIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { FileListProps } from '@/types';

export function FileList({ 
  files, 
  selectedFile, 
  onFileSelect, 
  onNewFile, 
  isLoading = false 
}: FileListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Files
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredFiles.length}
          </span>
        </div>
        
        {/* New File Button */}
        <button
          onClick={onNewFile}
          disabled={isLoading}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium 
                   text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700
                   border border-transparent rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          New File
        </button>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 
                     rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center">
            <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading files...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="p-4 text-center">
            <FileIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No files match your search' : 'No markdown files found'}
            </p>
            {!searchTerm && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Create your first file to get started
              </p>
            )}
          </div>
        ) : (
          <div className="p-2">
            {filteredFiles.map((file) => (
              <button
                key={file.name}
                onClick={() => onFileSelect(file.name)}
                className={`w-full text-left p-3 rounded-md mb-1 transition-colors duration-200
                  ${selectedFile === file.name
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FileIcon className={`h-4 w-4 flex-shrink-0 ${
                    selectedFile === file.name 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-400'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">
                        {file.name.replace('.md', '')}
                      </p>
                      <span className={`text-xs font-medium flex-shrink-0 ${
                        selectedFile === file.name
                          ? 'text-blue-900/50 dark:text-blue-100/50'
                          : 'text-gray-700/50 dark:text-gray-300/50'
                      }`}>
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <p 
                      className="text-xs text-gray-500 dark:text-gray-400 truncate" 
                      title={file.path}
                    >
                      {file.path}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Repository: {process.env.NEXT_PUBLIC_GITHUB_REPO_NAME || 'Loading...'}
        </p>
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}