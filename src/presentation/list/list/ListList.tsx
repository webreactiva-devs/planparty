import { useNavigate } from "react-router-dom";

import { ListRoutes } from "@/presentation/list/routes";
import { useGetLists } from "@/services/list/services";
import { Button } from "@/shadcn/components/ui/button";
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
  const navigate = useNavigate();

  return (
    <Table>
      <TableCaption>A list of lists.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Created</TableHead>
          <TableHead className="text-right">Actions</TableHead> {/* Nueva columna para acciones */}
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
            <TableCell className="text-right">
              <Button onClick={() => navigate(ListRoutes.delete(list.id))}>Delete</Button>
              <Button onClick={() => navigate(ListRoutes.edit(list.id))}>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
