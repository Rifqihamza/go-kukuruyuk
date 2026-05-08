// Mock supabase client for when Supabase is not configured
// This file exists to prevent import errors but returns null/mock data

export const supabase = {
  from: () => ({
    select: () => ({
      order: () => ({
        then: (callback: any) => callback({ data: [], error: null })
      }),
      eq: () => ({
        single: () => ({
          then: (callback: any) => callback({ data: null, error: { message: 'Supabase not configured' } })
        })
      }),
      upsert: () => ({
        then: (callback: any) => callback({ error: { message: 'Supabase not configured' } })
      }),
      insert: () => ({
        select: () => ({
          then: (callback: any) => callback({ data: null, error: { message: 'Supabase not configured' } })
        })
      })
    }),
    update: () => ({
      eq: () => ({
        then: (callback: any) => callback({ error: { message: 'Supabase not configured' } })
      })
    })
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
    signUp: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve()
  }
};