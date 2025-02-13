import React from "react";
import Image from "next/image";
import { PlayCircle, FileText, Download } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LearnModulChapterContent({
  modulId,
  chapterId,
}: Readonly<{
  modulId: string;
  chapterId: string;
}>) {
  const content = {
    video: {
      url: "https://example.com/video.mp4",
      thumbnail: "/images/unavailable-profile.png",
      duration: "10:00",
    },
    reading: {
      sections: [
        {
          title: "Pengertian Cloud Computing",
          content: `Cloud computing adalah model komputasi yang memungkinkan akses jaringan yang mudah dan on-demand ke kumpulan sumber daya komputasi yang dapat dikonfigurasi (misalnya, jaringan, server, penyimpanan, aplikasi, dan layanan) yang dapat dengan cepat disediakan dan dirilis dengan upaya manajemen atau interaksi penyedia layanan yang minimal.

          Teknologi ini telah mengubah cara organisasi dan individu menggunakan sumber daya komputasi, menyimpan data, dan menjalankan aplikasi.`,
        },
        {
          title: "Karakteristik Utama",
          content: `Beberapa karakteristik utama cloud computing meliputi:
          
          1. On-demand self-service
          2. Broad network access
          3. Resource pooling
          4. Rapid elasticity
          5. Measured service`,
        },
      ],
      resources: [
        {
          name: "Panduan Cloud Computing.pdf",
          size: "2.5 MB",
        },
        {
          name: "Infografis Cloud Computing.png",
          size: "1.2 MB",
        },
      ],
    },
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList>
            <TabsTrigger value="video">
              <PlayCircle className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="reading">
              <FileText className="h-4 w-4 mr-2" />
              Materi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={
                  content.video.thumbnail || "/images/unavailable-profile.png"
                }
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16">
                  <PlayCircle className="h-8 w-8" />
                </Button>
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Durasi: {content.video.duration}
            </p>
          </TabsContent>

          <TabsContent value="reading" className="space-y-8">
            {content.reading.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold">
                  {section.title}
                </h3>
                <div className="prose max-w-none dark:prose-invert">
                  {section.content.split("\n\n").map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-xs md:text-sm leading-relaxed"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t pt-6">
              <h4 className="text-sm md:text-base font-semibold mb-4">
                Materi Pendukung
              </h4>
              <div className="space-y-2">
                {content.reading.resources.map((resource, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    <span className="flex-1 text-left">{resource.name}</span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {resource.size}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
