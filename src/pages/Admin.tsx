import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  RefreshCw, 
  Phone, 
  MapPin, 
  Download,
  Filter,
  Eye,
  X,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { getTutorRequests, updateRequestStatus, isSupabaseConfigured } from '../lib/supabase';
import { 
  createAdminReplyWhatsAppLink, 
  generateWhatsAppMessage 
} from '../lib/whatsapp';
import type { TutorRequest } from '../types';

export const Admin: React.FC = () => {
  const [requests, setRequests] = useState<TutorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'matched' | 'closed'>('all');
  const [selectedRequest, setSelectedRequest] = useState<TutorRequest | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await getTutorRequests();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'matched' | 'closed') => {
    await updateRequestStatus(id, newStatus);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleCopyTextForm = (req: TutorRequest) => {
    const text = generateWhatsAppMessage(req);
    navigator.clipboard.writeText(text);
    setCopiedId(req.id || 'current');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredRequests = requests.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const exportToCSV = () => {
    if (requests.length === 0) return;

    const headers = [
      'ID',
      'Date',
      'Role',
      'Name',
      'Phone',
      'Email',
      'Class',
      'Board',
      'Subjects',
      'Help Needed',
      'Area',
      'Landmark',
      'Preferred Days',
      'Preferred Time',
      'Frequency',
      'Status',
      'Message',
    ];

    const rows = requests.map((r) => [
      r.id || '',
      r.created_at ? new Date(r.created_at).toLocaleDateString() : '',
      r.user_type || 'parent',
      `"${r.parent_name}"`,
      r.phone,
      r.email || '',
      r.student_class,
      r.board || '',
      `"${r.subjects.join(', ')}"`,
      `"${r.help_needed.join(', ')}"`,
      `"${r.area}"`,
      `"${r.landmark || ''}"`,
      `"${r.preferred_days.join(', ')}"`,
      r.preferred_time,
      r.frequency || '',
      r.status || 'new',
      `"${(r.additional_message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `spectre_tutor_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-parchment py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-navy transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-navy">
                Spectre Operator Portal
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                {isSupabaseConfigured ? 'Supabase Connected' : 'Local Storage Mode'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Review incoming home tutoring requests and tutor registrations from Delhi.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={fetchRequests}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white border border-border-subtle text-xs font-medium text-navy hover:bg-slate-50 transition-colors shadow-xs"
              title="Refresh list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={exportToCSV}
              disabled={requests.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-navy text-white text-xs font-semibold hover:bg-navy-dark transition-colors shadow-xs disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-md border border-border-subtle p-3 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-1 text-xs font-medium text-ink-muted">
            <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>Filter:</span>
            {(['all', 'new', 'contacted', 'matched', 'closed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded capitalize transition-colors ${
                  statusFilter === status
                    ? 'bg-navy text-white font-semibold'
                    : 'text-ink-muted hover:text-navy hover:bg-slate-100'
                }`}
              >
                {status} ({status === 'all' ? requests.length : requests.filter((r) => r.status === status).length})
              </button>
            ))}
          </div>

          <div className="text-xs text-ink-muted">
            Showing <span className="font-semibold text-navy">{filteredRequests.length}</span> requests
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-md border border-border-subtle shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-sm text-ink-muted">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-trust" />
              Loading requests...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-12 text-center text-sm text-ink-muted">
              No requests found matching the current filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-border-subtle text-ink-muted font-heading uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Subjects</th>
                    <th className="py-3 px-4">Area in Delhi</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredRequests.map((req) => (
                    <tr key={req.id || Math.random()} className="hover:bg-slate-50/70 transition-colors">
                      {/* Date */}
                      <td className="py-3 px-4 whitespace-nowrap text-ink-muted text-xs">
                        {req.created_at
                          ? new Date(req.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                            })
                          : 'Recent'}
                      </td>

                      {/* Type Badge */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                            req.user_type === 'tutor'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {req.user_type === 'tutor' ? '🧑‍🏫 Tutor' : '👨‍👩‍👧 Parent'}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4 whitespace-nowrap font-medium text-navy">
                        {req.parent_name}
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <a
                          href={`tel:${req.phone}`}
                          className="font-mono text-xs text-trust hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>+91 {req.phone}</span>
                        </a>
                      </td>

                      {/* Class */}
                      <td className="py-3 px-4 whitespace-nowrap text-ink">
                        <span className="font-semibold">{req.student_class}</span>
                        {req.board && (
                          <span className="text-xs text-ink-muted ml-1">({req.board})</span>
                        )}
                      </td>

                      {/* Subjects */}
                      <td className="py-3 px-4 text-ink">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {req.subjects.map((sub) => (
                            <span
                              key={sub}
                              className="px-1.5 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-slate-700"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Area */}
                      <td className="py-3 px-4 text-ink font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-trust shrink-0" />
                          <span>{req.area}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={req.status || 'new'}
                          onChange={(e) =>
                            handleStatusChange(
                              req.id!,
                              e.target.value as 'new' | 'contacted' | 'matched' | 'closed'
                            )
                          }
                          className="text-xs font-semibold rounded border border-border-subtle py-1 px-2 bg-white text-navy focus:outline-none focus:ring-1 focus:ring-navy"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="matched">Matched</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 whitespace-nowrap text-right space-x-2">
                        <a
                          href={createAdminReplyWhatsAppLink(req)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#25D366]/10 text-[#1b8a43] hover:bg-[#25D366]/20 font-semibold text-xs transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(req)}
                          className="text-xs text-trust hover:text-trust-hover font-semibold inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Full Request Details & WhatsApp Text Form */}
        {selectedRequest && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <div
              className="bg-white rounded-lg border border-border-subtle max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-border-subtle pb-4">
                <div>
                  <span className="text-xs font-mono text-ink-muted">{selectedRequest.id}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="font-heading font-bold text-xl text-navy">
                      {selectedRequest.parent_name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-800">
                      {selectedRequest.user_type === 'tutor' ? 'Tutor' : 'Parent'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="p-1 rounded-md text-ink-muted hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick WhatsApp outreach button */}
              <div className="flex flex-wrap gap-2 pt-1 pb-3 border-b border-slate-100">
                <a
                  href={createAdminReplyWhatsAppLink(selectedRequest)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyTextForm(selectedRequest)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-navy text-xs font-semibold transition-colors"
                >
                  {copiedId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId ? 'Copied Message!' : 'Copy WhatsApp Message'}</span>
                </button>
              </div>

              {/* WhatsApp Text Form Preview Box */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted block mb-1">
                  Pre-filled WhatsApp Message:
                </label>
                <pre className="p-3 bg-slate-50 rounded border border-border-subtle text-[11px] font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {generateWhatsAppMessage(selectedRequest)}
                </pre>
              </div>

              <div className="space-y-3 text-xs sm:text-sm pt-2">
                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-ink-muted block text-xs">Phone:</span>
                    <a
                      href={`tel:${selectedRequest.phone}`}
                      className="font-semibold text-trust hover:underline"
                    >
                      +91 {selectedRequest.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-ink-muted block text-xs">Email:</span>
                    <span className="font-medium text-navy">{selectedRequest.email || 'Not provided'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-ink-muted block text-xs">Class:</span>
                    <span className="font-semibold text-navy">{selectedRequest.student_class}</span>
                  </div>
                  <div>
                    <span className="text-ink-muted block text-xs">Board:</span>
                    <span className="font-medium text-navy">{selectedRequest.board || 'CBSE'}</span>
                  </div>
                </div>

                <div className="pb-2 border-b border-slate-100">
                  <span className="text-ink-muted block text-xs mb-1">Subjects:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRequest.subjects.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-xs font-semibold text-navy">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pb-2 border-b border-slate-100">
                  <span className="text-ink-muted block text-xs mb-1">Help Needed / Focus:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRequest.help_needed.map((h) => (
                      <span key={h} className="px-2 py-0.5 rounded bg-trust-light text-xs font-medium text-trust">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-ink-muted block text-xs">Area in Delhi:</span>
                    <span className="font-semibold text-navy">{selectedRequest.area}</span>
                  </div>
                  <div>
                    <span className="text-ink-muted block text-xs">Landmark:</span>
                    <span className="font-medium text-navy">{selectedRequest.landmark || 'None'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-ink-muted block text-xs">Preferred Days:</span>
                    <span className="font-medium text-navy">{selectedRequest.preferred_days.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-ink-muted block text-xs">Timing & Frequency:</span>
                    <span className="font-medium text-navy">
                      {selectedRequest.preferred_time} ({selectedRequest.frequency || 'Flexible'})
                    </span>
                  </div>
                </div>

                {selectedRequest.additional_message && (
                  <div className="pb-2 border-b border-slate-100">
                    <span className="text-ink-muted block text-xs mb-1">Message / Notes:</span>
                    <p className="p-2.5 bg-slate-50 rounded text-ink text-xs leading-relaxed italic">
                      "{selectedRequest.additional_message}"
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-ink-muted block text-xs mb-1 font-medium">Update Status:</label>
                  <div className="flex gap-2">
                    {(['new', 'contacted', 'matched', 'closed'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedRequest.id!, st)}
                        className={`px-3 py-1.5 rounded text-xs capitalize font-semibold border transition-all ${
                          selectedRequest.status === st
                            ? 'bg-navy text-white border-navy'
                            : 'bg-white text-ink border-border-subtle hover:bg-slate-50'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
