import { useGetItems } from "@/services/item/services";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { dateFormatter } from "@/utils/formatDate";

type Props = {
  listId?: string;
};

export default function ItemItem({ listId }: Props) {
  const { data, isError, isLoading } = useGetItems(listId);

  return (
    <Table>
      <TableCaption>Items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>List</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableRow>Loading...</TableRow>}
        {isError && <TableRow>Error</TableRow>}
        {data?.map((item) => (
          <TableRow key={item.id} className="hover:cursor-pointer">
            <TableCell>{item.list_id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.user}</TableCell>
            <TableCell className="text-right">{dateFormatter.format(item.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
