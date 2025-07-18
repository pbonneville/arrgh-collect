'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  MDXEditor, 
  headingsPlugin, 
  listsPlugin, 
  linkPlugin, 
  quotePlugin, 
  markdownShortcutPlugin,
  toolbarPlugin,
  thematicBreakPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  imagePlugin,
  linkDialogPlugin,
  frontmatterPlugin,
  diffSourcePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertCodeBlock,
  ListsToggle,
  CreateLink,
  InsertThematicBreak,
  InsertTable,
  InsertImage,
  InsertFrontmatter,
  BlockTypeSelect,
  DiffSourceToggleWrapper,
  Separator
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './SimpleMarkdownEditor.css';
import { FrontmatterForm } from './FrontmatterForm';
import { MarkdownEditorProps } from '@/types';

function MDXEditorComponent({ file, onSave, onCancel, isLoading = false }: MarkdownEditorProps) {
  const [content, setContent] = useState(file?.content || '');
  const [frontmatter, setFrontmatter] = useState(file?.frontmatter || {
    title: '',
    author: '',
    status: 'draft' as const,
    tags: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update content and frontmatter when file prop changes
  useEffect(() => {
    if (file) {
      setContent(file.content || '');
      setFrontmatter(file.frontmatter || {
        title: '',
        author: '',
        status: 'draft' as const,
        tags: [],
      });
    }
  }, [file]);

  const handleSave = useCallback(async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      await onSave(content, frontmatter);
    } finally {
      setIsSaving(false);
    }
  }, [content, frontmatter, onSave, isSaving]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const isDisabled = isLoading || isSaving;

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  if (!mounted) {
    return <div className="min-h-[400px] bg-gray-50 animate-pulse rounded-lg"></div>;
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* File Info Header */}
      {file && (
        <div className="flex-shrink-0 px-4 py-3 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {file.filename}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {file.path || file.filename}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Frontmatter Form */}
      <div className="flex-shrink-0 p-4">
        <FrontmatterForm 
          frontmatter={frontmatter}
          onChange={setFrontmatter}
          isReadOnly={isDisabled}
        />
      </div>

      {/* MDX Editor */}
      <div className="flex-1 p-4 min-h-0">
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <MDXEditor
            key={`${file?.filename || 'new-file'}-${file?.sha || 'new'}`} // Force reset when file changes
            markdown={content}
            onChange={handleChange}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
              codeMirrorPlugin({ 
                codeBlockLanguages: { 
                  javascript: 'JavaScript',
                  typescript: 'TypeScript',
                  jsx: 'JSX',
                  tsx: 'TSX',
                  css: 'CSS',
                  html: 'HTML',
                  json: 'JSON',
                  python: 'Python',
                  bash: 'Bash',
                  sql: 'SQL',
                  markdown: 'Markdown',
                  yaml: 'YAML',
                  xml: 'XML',
                  swift: 'Swift',
                  ruby: 'Ruby',
                  '': 'Plain Text' // Handle empty/unknown language
                } 
              }),
              tablePlugin(),
              imagePlugin({
                imageUploadHandler: () => {
                  return Promise.resolve('https://picsum.photos/200/300');
                }
              }),
              frontmatterPlugin(),
              diffSourcePlugin({ 
                viewMode: 'rich-text',
                diffMarkdown: ''
              }),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <DiffSourceToggleWrapper>
                    <UndoRedo />
                    <Separator />
                    <BlockTypeSelect />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <Separator />
                    <ListsToggle />
                    <Separator />
                    <CreateLink />
                    <Separator />
                    <InsertCodeBlock />
                    <InsertTable />
                    <InsertImage />
                    <Separator />
                    <InsertThematicBreak />
                    <InsertFrontmatter />
                  </DiffSourceToggleWrapper>
                )
              })
            ]}
            className="min-h-[400px]"
            readOnly={isDisabled}
            placeholder={isDisabled ? 'Loading...' : 'Start writing your markdown content...'}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {file?.filename ? `Editing: ${file.filename}` : 'Creating new file'}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCancel}
              disabled={isDisabled}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       bg-white dark:bg-gray-700 
                       rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              Cancel
            </button>
            
            <button 
              onClick={handleSave}
              disabled={isDisabled || !content.trim() || !frontmatter.title?.trim()}
              className="px-4 py-2 text-sm font-medium text-white 
                       bg-blue-600 hover:bg-blue-700 focus:bg-blue-700
                       border border-transparent rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200 flex items-center gap-2"
            >
              {isSaving && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
        
        {/* Save requirements hint */}
        {(!content.trim() || !frontmatter.title?.trim()) && (
          <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            Please add a title and content before saving
          </div>
        )}
      </div>
    </div>
  );
}

export const MarkdownEditor = dynamic(() => Promise.resolve(MDXEditorComponent), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse rounded-lg"></div>
});