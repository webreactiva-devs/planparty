import { useNavigate } from "react-router-dom";

import { DummyRoutes } from "@/presentation/dummy/routes";
import { useGetDummies } from "@/services/dummy/services";
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

export default function DummyList() {
  const { data, isError, isLoading } = useGetDummies();
  const navigate = useNavigate();
  return (
    <Table>
      <TableCaption>A list of dummies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell colSpan={3}>Loading...</TableCell>
          </TableRow>
        )}
        {isError && (
          <TableRow>
            <TableCell colSpan={3}>Error</TableCell>
          </TableRow>
        )}
        {data?.map((dummy) => (
          <TableRow
            key={dummy.id}
            onClick={() => navigate(DummyRoutes.edit(dummy.id))}
            className="hover:cursor-pointer"
          >
            <TableCell>{dummy.name}</TableCell>
            <TableCell>{dummy.description}</TableCell>
            <TableCell className="text-right">{dateFormatter.format(dummy.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
