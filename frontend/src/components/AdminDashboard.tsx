import React, { useEffect, useState } from 'react';
import { getPendingLocationRequests, approveLocationRequest, rejectLocationRequest } from '../locationRequests';
import { supabase } from '../supabaseClient';
import { LocationOwnershipRequest } from '../types';

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<LocationOwnershipRequest[]>([]);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const userId = data.user?.id ?? null;
      setAdminId(userId);

      // Check if user is admin
      if (userId) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('is_admin')
          .eq('user_id', userId)
          .single();
        setIsAdmin(roles?.is_admin ?? false);
      }
    });
    // Fetch pending requests
    getPendingLocationRequests().then(({ data }) => setRequests(data ?? []));
  }, []);

  const handleApprove = async (req: LocationOwnershipRequest) => {
    if (!adminId) return;
    await approveLocationRequest(req, adminId);
    setRequests(requests.filter(r => r.id !== req.id));
  };

  const handleReject = async (req: LocationOwnershipRequest) => {
    if (!adminId) return;
    await rejectLocationRequest(req.id, adminId);
    setRequests(requests.filter(r => r.id !== req.id));
  };

  return (
    <div>
      <h2>Pending Location Ownership Requests</h2>
      {requests.length === 0 && <div>No pending requests.</div>}
      <ul>
        {requests.map(req => (
          <li key={req.id}>
            <strong>{req.location_name}</strong> requested by {req.user_id}
            <button onClick={() => handleApprove(req)}>Approve</button>
            <button onClick={() => handleReject(req)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard; 