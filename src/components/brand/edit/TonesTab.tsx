
import React from 'react';
import { ToneSelector } from '../ToneSelector';

interface TonesTabProps {
  selectedTones: string[];
  setSelectedTones: (tones: string[]) => void;
}

export function TonesTab({ selectedTones, setSelectedTones }: TonesTabProps) {
  return (
    <ToneSelector
      selectedTones={selectedTones}
      onTonesChange={setSelectedTones}
    />
  );
}
