import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "Bagaimana cara memulai modul pembelajaran?",
    answer:
      "Untuk memulai pembelajaran, navigasikan ke bagian 'Pembelajaran' dan pilih modul yang menarik bagi Anda. Kami menyarankan untuk memulai dengan modul yang paling pertama.",
  },
  {
    question: "Saya lupa kata sandi saya. Bagaimana cara meresetnya?",
    answer:
      "Klik tautan 'Lupa Kata Sandi' pada halaman login. Masukkan alamat email yang terdaftar, dan kami akan mengirimkan instruksi untuk mereset kata sandi Anda.",
  },
  {
    question: "Bagaimana cara menghitung skor kuis?",
    answer:
      "Kuis akan dinilai secara otomatis setelah Anda mengirimkan jawaban. Setiap jawaban yang benar akan menambahkan skor Anda, dan Anda memerlukan skor 70% atau lebih untuk lulus. Anda dapat mengulang kuis untuk meningkatkan skor Anda.",
  },
  {
    question:
      "Dapatkah saya mengunduh materi pembelajaran untuk digunakan secara offline?",
    answer:
      "Ya, sebagian besar materi pembelajaran tersedia untuk diunduh sebagai PDF. Cari ikon unduh di samping setiap bagian modul untuk menyimpannya agar dapat diakses secara offline.",
  },
  {
    question: "Bagaimana cara berpartisipasi di forum diskusi?",
    answer:
      "Untuk berpartisipasi dalam diskusi, kunjungi bagian 'Forum Diskusi'. Anda dapat membuat topik baru atau membalas yang sudah ada. Ingat untuk mengikuti pedoman komunitas kami saat posting.",
  },
];

export default function SupportFAQ() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
