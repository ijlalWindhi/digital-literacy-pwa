import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari diskusi..."
          className="pl-10 w-full sm:max-w-[300px]"
        />
      </div>
    </div>
  );
}
