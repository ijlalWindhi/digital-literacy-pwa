import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ForumHeader() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="md:text-xl font-semibold leading-none tracking-tight">
            Forum Diskusi
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Diskusikan dan bagikan pengalaman belajar Anda
          </p>
        </div>
        <Link href="/forum/new">
          <Button>
            <PlusCircle className="h-4 w-4" />
            Buat Diskusi Baru
          </Button>
        </Link>
      </div>
    </div>
  );
}
