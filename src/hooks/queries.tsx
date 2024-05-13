import {
  MutationFunction,
  MutationKey,
  QueryFunction,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useToast } from "@/shadcn/components/ui/use-toast";

type GetListProps<T> = {
  key: MutationKey;
  fn: QueryFunction<T>;
  properties?: object;
};

export function useGetList<T>({ key, fn, properties = {} }: GetListProps<T>): ReturnType<typeof useQuery<T>> {
  return useQuery({
    queryKey: key,
    queryFn: fn,
    initialData: [] as T,
    ...properties,
  });
}

type GetOneProps<T> = {
  key: MutationKey;
  fn: QueryFunction<T>;
  properties?: object;
};

export function useGetOne<T>({ key, fn, properties = {} }: GetOneProps<T>): ReturnType<typeof useQuery<T>> {
  return useQuery({
    queryKey: key,
    queryFn: fn,
    initialData: null,
    initialDataUpdatedAt: Date.now() - 1000 * 60 * 60 * 24,
    ...properties,
  });
}

type MutationGeneralProps<T, U> = {
  key: MutationKey;
  fn: MutationFunction<U, T>;
  successMessage?: string;
  errorMessage?: string;
  properties?: UseMutationOptions<U, unknown, T>;
};

export function useMutationGeneral<T, U = void>({
  key,
  fn,
  successMessage,
  errorMessage,
  properties = {},
}: MutationGeneralProps<T, U>): UseMutationResult<U, unknown, T> {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      if (successMessage) {
        toast({
          title: successMessage,
        });
      }
      queryClient.invalidateQueries({ queryKey: key });
    },
    onError: () => {
      toast({
        title: errorMessage ?? "Se ha producido un error inesperado",
        variant: "destructive",
      });
    },
    ...properties,
  });
}
