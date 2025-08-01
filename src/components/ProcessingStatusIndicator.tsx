'use client';

import { 
  CheckCircle, 
  Clock, 
  Loader2, 
  AlertCircle, 
  RefreshCw,
  FileText
} from 'lucide-react';

export type ProcessingStatus = 'pending' | 'queued' | 'processing' | 'extracted' | 'failed' | 'retry';

interface ProcessingStatusIndicatorProps {
  status: ProcessingStatus;
  timestamp?: string;
  attempts?: number;
  errorMessage?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProcessingStatusIndicator({ 
  status, 
  timestamp, 
  attempts = 0,
  errorMessage,
  className = '',
  showLabel = true 
}: ProcessingStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'queued':
        return {
          icon: Clock,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          label: 'Queued for Processing',
          description: 'Content extraction queued',
          animate: false
        };
      case 'processing':
        return {
          icon: Loader2,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          label: 'Processing Content',
          description: 'Extracting page content...',
          animate: true
        };
      case 'extracted':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          label: 'Content Extracted',
          description: 'Full page content available',
          animate: false
        };
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          label: 'Extraction Failed',
          description: errorMessage || 'Content extraction failed',
          animate: false
        };
      case 'retry':
        return {
          icon: RefreshCw,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          label: `Retry Scheduled ${attempts > 1 ? `(Attempt ${attempts})` : ''}`,
          description: 'Will retry content extraction',
          animate: false
        };
      case 'pending':
      default:
        return {
          icon: FileText,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          label: 'Manual Extraction Available',
          description: 'Click to extract page content',
          animate: false
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  // Format timestamp for display
  const formatTimestamp = (ts?: string) => {
    if (!ts) return '';
    try {
      const date = new Date(ts);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      
      if (diffMins < 1) return 'just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border ${config.bgColor} ${config.borderColor} ${className}`}>
      <Icon 
        className={`h-4 w-4 ${config.color} ${config.animate ? 'animate-spin' : ''}`}
      />
      {showLabel && (
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
          {config.description && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {config.description}
              {timestamp && ` • ${formatTimestamp(timestamp)}`}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for use in lists
export function ProcessingStatusBadge({ 
  status, 
  className = '' 
}: { 
  status: ProcessingStatus; 
  className?: string; 
}) {
  return (
    <ProcessingStatusIndicator 
      status={status} 
      showLabel={false} 
      className={`px-2 py-1 ${className}`} 
    />
  );
}