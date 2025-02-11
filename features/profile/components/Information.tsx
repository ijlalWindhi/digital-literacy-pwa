import { Card, CardContent } from "@/components/ui/card";

import useAuth from "@/stores/auth";

interface IUnitKerja {
  id: number;
  nama: string;
}
interface IProfileRowProps {
  label: string;
  value: string | IUnitKerja[] | null;
}

function ProfileRow({ label, value }: Readonly<IProfileRowProps>) {
  return (
    <div className="flex flex-col md:flex-row justify-start py-3 border-b first:border-b-0 last:border-b-0">
      <dt className="text-sm font-medium text-muted-foreground w-48">
        {label}
      </dt>
      <span className="pr-2 hidden md:block w-2">:</span>
      <dd className="text-sm text-left md:text-right">
        {(!Array.isArray(value) && value) || "-"}
      </dd>
    </div>
  );
}

export default function Information() {
  // variables
  const { me } = useAuth();

  return (
    <Card className="w-full border-0 rounded-2xl">
      <CardContent className="pt-6">
        <dl className="divide-y">
          <ProfileRow label="Nama" value={me.name} />
          <ProfileRow label="Email" value={me.email} />
          <ProfileRow label="Nama Pengguna" value={me.username} />
          <ProfileRow label="Posisi" value={me.role?.nama} />
        </dl>
      </CardContent>
    </Card>
  );
}
