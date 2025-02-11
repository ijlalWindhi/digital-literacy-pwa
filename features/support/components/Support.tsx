import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupportFAQ from "./SupportFaq";
import ContactForm from "./ContactForm";

export default function Support() {
  return (
    <div className="container mx-auto">
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Hubungi Kami</TabsTrigger>
        </TabsList>
        <TabsContent value="faq">
          <SupportFAQ />
        </TabsContent>
        <TabsContent value="contact">
          <ContactForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
