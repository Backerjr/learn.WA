import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import { Sparkles, Loader2, Upload, FileText, X, ArrowLeft, Trash2 } from 'lucide-react';
import AIService, { Flashcard } from '@/services/ai';

/**
 * FlashcardUploader Component
 * 
 * Allows users to:
 * 1. Generate flashcards using AI Magic Generator (mock service)
 * 2. Upload CSV files to import flashcards
 * 
 * Both methods populate the same preview table.
 */

interface PreviewCard extends Flashcard {
  source: 'AI (mock)' | 'CSV';
}

const FlashcardUploader: React.FC = () => {
  // AI Magic Generator state
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // CSV upload state
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Shared state
  const [previewData, setPreviewData] = useState<PreviewCard[]>([]);
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  /**
   * AI Magic Generator - Generate flashcards from text
   */
  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to generate flashcards.');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    try {
      const cards = await AIService.generateFlashcardsFromText(inputText);
      const previewCards: PreviewCard[] = cards.map(card => ({
        ...card,
        source: 'AI (mock)' as const
      }));
      
      // Merge with existing preview data
      setPreviewData(prev => [...prev, ...previewCards]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Clear the AI input text
   */
  const handleClearInput = () => {
    setInputText('');
    setError('');
  };

  /**
   * Parse CSV file
   */
  const parseFile = (file: File) => {
    if (!file) return;
    
    // Validate file type
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setError('Please upload a valid CSV file.');
      return;
    }
    
    setError('');
    setIsParsing(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setIsParsing(false);
        
        if (results.errors.length > 0) {
          setError(`CSV parsing error: ${results.errors[0].message}`);
          return;
        }
        
        // Validate required columns
        const data = results.data as Record<string, string>[];
        if (data.length === 0) {
          setError('The CSV file is empty.');
          return;
        }
        
        // Try to find front/back columns (case-insensitive)
        const firstRow = data[0];
        const keys = Object.keys(firstRow);
        const frontKey = keys.find(k => k.toLowerCase() === 'front') || keys[0];
        const backKey = keys.find(k => k.toLowerCase() === 'back') || keys[1];
        const categoryKey = keys.find(k => k.toLowerCase() === 'category');
        
        if (!frontKey || !backKey) {
          setError('CSV must have at least two columns (front and back).');
          return;
        }
        
        const parsedCards: PreviewCard[] = data
          .filter(row => row[frontKey] && row[backKey])
          .map(row => ({
            front: row[frontKey],
            back: row[backKey],
            category: categoryKey ? row[categoryKey] || 'General' : 'General',
            source: 'CSV' as const
          }));
        
        if (parsedCards.length === 0) {
          setError('No valid flashcard data found in CSV.');
          return;
        }
        
        // Merge with existing preview data
        setPreviewData(prev => [...prev, ...parsedCards]);
      },
      error: (err) => {
        setIsParsing(false);
        setError(`Failed to parse CSV: ${err.message}`);
      }
    });
  };

  /**
   * Handle file drop
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      parseFile(files[0]);
    }
  };

  /**
   * Handle drag over
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  /**
   * Handle drag leave
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  /**
   * Handle file input change
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      parseFile(files[0]);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Clear all preview data
   */
  const handleClearAll = () => {
    setPreviewData([]);
    setError('');
  };

  /**
   * Remove a single card from preview
   */
  const handleRemoveCard = (index: number) => {
    setPreviewData(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" />
            Flashcard Uploader
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={() => setError('')}
              className="text-red-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* AI Magic Generator Section - ABOVE the Drop Zone */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 text-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-purple-900">Magic Generator</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Paste any text and let AI generate flashcards for you automatically.
          </p>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here... (e.g., vocabulary lists, travel phrases, study notes)"
            className="w-full h-32 px-4 py-3 rounded-lg border border-purple-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            disabled={isGenerating}
          />
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !inputText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate
                </>
              )}
            </button>
            
            <button
              onClick={handleClearInput}
              disabled={isGenerating || !inputText}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
              Clear
            </button>
          </div>
        </section>

        {/* CSV Upload Drop Zone */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-purple-400" />
            Upload CSV
          </h2>
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
              ${isDragOver 
                ? 'border-purple-400 bg-purple-500/20' 
                : 'border-gray-600 bg-white/5 hover:border-purple-500 hover:bg-purple-500/10'
              }
              ${isParsing ? 'opacity-50 pointer-events-none' : ''}
            `}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {isParsing ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                <p className="text-lg text-gray-300">Parsing CSV...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="text-lg text-gray-300">
                  {isDragOver ? 'Drop your CSV file here' : 'Drag & drop a CSV file here'}
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse • CSV should have "front" and "back" columns
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Preview Table */}
        {previewData.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Preview ({previewData.length} cards)
              </h2>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Front</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Back</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Source</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-300 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {previewData.map((card, index) => (
                    <tr key={index} className="bg-white/5 hover:bg-white/10 transition-colors">
                      <td className="px-4 py-3 text-white">{card.front}</td>
                      <td className="px-4 py-3 text-gray-300">{card.back}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                          {card.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          card.source === 'AI (mock)' 
                            ? 'bg-indigo-500/20 text-indigo-300' 
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {card.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleRemoveCard(index)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                          title="Remove card"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Empty State */}
        {previewData.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No flashcards yet</p>
            <p className="text-sm mt-2">Generate cards with AI or upload a CSV to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FlashcardUploader;
