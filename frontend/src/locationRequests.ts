import { supabase } from './supabaseClient';
import { LocationOwnershipRequest } from './types';

export async function requestLocationOwnership(locationName: string, userId: string) {
  const { data, error } = await supabase
    .from('location_ownership_requests')
    .insert([{ location_name: locationName, user_id: userId }])
    .select()
    .single();
  return { data, error };
}

export async function getUserLocationRequests(userId: string) {
  const { data, error } = await supabase
    .from('location_ownership_requests')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
}

export async function getPendingLocationRequests() {
  return await supabase
    .from('location_ownership_requests')
    .select('*')
    .eq('status', 'pending');
}

export async function approveLocationRequest(request: LocationOwnershipRequest, adminId: string) {
  // 1. Mark request as approved
  await supabase
    .from('location_ownership_requests')
    .update({
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewer_id: adminId,
    })
    .eq('id', request.id);

  // 2. Add to locations table
  await supabase
    .from('locations')
    .insert({
      name: request.location_name,
      owner_id: request.user_id,
      status: 'approved',
    });
}

export async function rejectLocationRequest(requestId: string, adminId: string) {
  await supabase
    .from('location_ownership_requests')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewer_id: adminId,
    })
    .eq('id', requestId);
}