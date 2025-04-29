
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConnectionAlertProps {
  t: (key: string) => string;
}

export function ConnectionAlert({ t }: ConnectionAlertProps) {
  return (
    <div className="mb-6 p-4 border border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
      <p className="text-sm text-yellow-700 dark:text-yellow-400">
        {t('supabaseNotConnected')}
      </p>
    </div>
  );
}
