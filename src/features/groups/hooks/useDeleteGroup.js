import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup as deleteGroupApi } from '../api/groupsApi';

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroupApi,
    onSuccess: () => {
      // Refresh the list immediately after deleting
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (err) => alert(err.message),
  });
}