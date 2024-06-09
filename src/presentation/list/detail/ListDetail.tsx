import { useGetOneList } from "@/services/list/services";
import { Alert, AlertTitle } from "@/shadcn/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Label } from "@/shadcn/components/ui/label";
import { dateFormatter } from "@/utils/formatDate";

export default function ListDetail(id: any) {
  const { data, isError, isLoading } = useGetOneList(id);
  const list = data;
  return (
    <div className="container">
      {isLoading && (
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
        </Alert>
      )}
      {isError && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>List Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Name:</Label>
            <p>{list.name}</p>
          </div>
          <div>
            <Label>User:</Label>
            <p>{list.user}</p>
          </div>
          <div>
            <Label>Created At:</Label>
            <p>{dateFormatter.format(list.created_at)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
