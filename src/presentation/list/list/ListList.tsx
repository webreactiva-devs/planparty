import { useGetLists } from "@/services/list/services";
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

export default function ListList() {
  const { data, isError, isLoading } = useGetLists();
  // const navigate = useNavigate();
  return (
    <Table>
      <TableCaption>A list of lists.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <TableRow>Loading...</TableRow>}
        {isError && <TableRow>Error</TableRow>}
        {data?.map((list) => (
          <TableRow key={list.id} className="hover:cursor-pointer">
            <TableCell>{list.name}</TableCell>
            <TableCell>{list.user}</TableCell>
            <TableCell className="text-right">{dateFormatter.format(list.created_at)}</TableCell>
            <TableCell className="text-right">{dateFormatter.format(list.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
