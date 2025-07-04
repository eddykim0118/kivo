export interface SupabaseUser {
    id: string;
    email: string;
  }
  
  export interface LocationOwnershipRequest {
    id: string;
    user_id: string;
    location_name: string;
    status: 'pending' | 'approved' | 'rejected';
    requested_at: string;
    reviewed_at?: string;
    reviewer_id?: string;
  }

  export interface Location {
    id: string;
    name: string;
    owner_id: string;
    status: 'pending' | 'approved' | 'rejected';
  }