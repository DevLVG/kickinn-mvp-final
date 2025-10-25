import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePresence = (ventureId: string) => {
  useEffect(() => {
    const updatePresence = async (status: 'online' | 'offline') => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('user_presence')
        .upsert({
          venture_id: ventureId,
          user_id: user.id,
          status,
          last_seen: new Date().toISOString()
        }, {
          onConflict: 'venture_id,user_id'
        });
    };

    // Set online when component mounts
    updatePresence('online');

    // Set offline when component unmounts or tab closes
    const handleUnload = () => updatePresence('offline');
    window.addEventListener('beforeunload', handleUnload);

    // Update presence every 30 seconds
    const interval = setInterval(() => updatePresence('online'), 30000);

    return () => {
      updatePresence('offline');
      window.removeEventListener('beforeunload', handleUnload);
      clearInterval(interval);
    };
  }, [ventureId]);
};
