import { useState } from "react";
import { MapPin, Phone, Mail, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { COMPANY_INFO, getWhatsAppLink, COUNTRIES } from "@/lib/constants";
import { submitQuartzInquiry, type QuartzInquiryPayload } from "@/lib/inquiryService";

import bgContact from "@/assets/bg-contact.webp";

// --- Form state types (all sections) ---
type BuyerDetails = {
  companyName: string;
  contactPersonName: string;
  designation: string;
  email: string;
  mobileWhatsApp: string;
  companyAddress: string;
  country: string;
};

type QuartzRequirement = {
  typeRawQuartz: boolean;
  typeLumps: boolean;
  typeGrits: boolean;
  typePowder: boolean;
  typeHPQ: boolean;
  grade95: boolean;
  grade97: boolean;
  grade98: boolean;
  grade99: boolean;
  grade999: boolean;
  gradeOther: boolean;
  gradeOtherText: string;
  colorMilkyWhite: boolean;
  colorSnowWhite: boolean;
  colorCrystal: boolean;
  colorOther: boolean;
  colorOtherText: string;
  sizeSpecification: string;
};

type ChemicalSpecs = {
  sio2: string;
  fe2o3: string;
  al2o3: string;
  tio2: string;
  cao: string;
  mgo: string;
};

type QuantityRequirement = {
  requiredQuantity: string;
  quantityUnit: string;
  monthlyOrOneTime: "monthly" | "one_time" | "";
  trialQuantity: string;
};

type PackingDetails = {
  jumboBags: boolean;
  ppBags: boolean;
  bulk: boolean;
  customPacking: boolean;
  customPackingText: string;
};

type DeliveryTerms = {
  deliveryTerm: string;
  portOfDelivery: string;
  targetPrice: string;
};

type ApplicationEndUse = {
  glass: { container: boolean; float: boolean; specialty: boolean; optical: boolean; fiberglass: boolean };
  ceramic: { tiles: boolean; sanitary: boolean; tableware: boolean; technical: boolean };
  foundry: { moldingSand: boolean; coreMaking: boolean; refractory: boolean };
  construction: { chemicals: boolean; paints: boolean; flooring: boolean };
  solar: { mgSi: boolean; solarGlass: boolean; cruciblesIngot: boolean; polysilicon: boolean };
  semiconductor: { hpqFeedstock: boolean; fusedQuartz: boolean; waferProcessing: boolean; etchingFurnaces: boolean };
  crucible: { solarGrade: boolean; semiconductorGrade: boolean; czMethod: boolean; monocrystalline: boolean; polycrystalline: boolean };
  otherSpecialized: { lighting: boolean; laboratory: boolean; refractories: boolean; other: boolean; otherText: string };
};

type DocumentsRequired = {
  coa: boolean;
  msds: boolean;
  originCertificate: boolean;
  sample: boolean;
};

type Declaration = {
  confirmation: boolean;
  name: string;
  date: string;
};

const initialBuyer: BuyerDetails = {
  companyName: "",
  contactPersonName: "",
  designation: "",
  email: "",
  mobileWhatsApp: "",
  companyAddress: "",
  country: "",
};

const initialQuartz: QuartzRequirement = {
  typeRawQuartz: false,
  typeLumps: false,
  typeGrits: false,
  typePowder: false,
  typeHPQ: false,
  grade95: false,
  grade97: false,
  grade98: false,
  grade99: false,
  grade999: false,
  gradeOther: false,
  gradeOtherText: "",
  colorMilkyWhite: false,
  colorSnowWhite: false,
  colorCrystal: false,
  colorOther: false,
  colorOtherText: "",
  sizeSpecification: "",
};

const initialChemical: ChemicalSpecs = {
  sio2: "",
  fe2o3: "",
  al2o3: "",
  tio2: "",
  cao: "",
  mgo: "",
};

const initialQuantity: QuantityRequirement = {
  requiredQuantity: "",
  quantityUnit: "MT",
  monthlyOrOneTime: "",
  trialQuantity: "",
};

const initialPacking: PackingDetails = {
  jumboBags: false,
  ppBags: false,
  bulk: false,
  customPacking: false,
  customPackingText: "",
};

const initialDelivery: DeliveryTerms = {
  deliveryTerm: "",
  portOfDelivery: "",
  targetPrice: "",
};

const initialApplication: ApplicationEndUse = {
  glass: { container: false, float: false, specialty: false, optical: false, fiberglass: false },
  ceramic: { tiles: false, sanitary: false, tableware: false, technical: false },
  foundry: { moldingSand: false, coreMaking: false, refractory: false },
  construction: { chemicals: false, paints: false, flooring: false },
  solar: { mgSi: false, solarGlass: false, cruciblesIngot: false, polysilicon: false },
  semiconductor: { hpqFeedstock: false, fusedQuartz: false, waferProcessing: false, etchingFurnaces: false },
  crucible: { solarGrade: false, semiconductorGrade: false, czMethod: false, monocrystalline: false, polycrystalline: false },
  otherSpecialized: { lighting: false, laboratory: false, refractories: false, other: false, otherText: "" },
};

const initialDocuments: DocumentsRequired = {
  coa: false,
  msds: false,
  originCertificate: false,
  sample: false,
};

const inquirySchema = z.object({
  companyName: z.string().trim().min(1, "Company Name is required"),
  contactPersonName: z.string().trim().min(1, "Contact Person Name is required"),
  email: z.string().trim().email("Invalid email").min(1, "Email is required"),
  mobileWhatsApp: z.string().trim().min(1, "Mobile / WhatsApp No. is required"),
  confirmation: z.literal(true, { errorMap: () => ({ message: "You must accept the declaration" }) }),
  declarationName: z.string().trim().min(1, "Declaration name is required"),
  declarationDate: z.string().trim().min(1, "Declaration date is required"),
});

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [buyer, setBuyer] = useState<BuyerDetails>(initialBuyer);
  const [quartz, setQuartz] = useState<QuartzRequirement>(initialQuartz);
  const [chemical, setChemical] = useState<ChemicalSpecs>(initialChemical);
  const [quantity, setQuantity] = useState<QuantityRequirement>(initialQuantity);
  const [packing, setPacking] = useState<PackingDetails>(initialPacking);
  const [delivery, setDelivery] = useState<DeliveryTerms>(initialDelivery);
  const [application, setApplication] = useState<ApplicationEndUse>(initialApplication);
  const [documents, setDocuments] = useState<DocumentsRequired>(initialDocuments);
  const [additionalRemarks, setAdditionalRemarks] = useState("");
  const [declaration, setDeclaration] = useState<Declaration>({
    confirmation: false,
    name: "",
    date: "",
  });

  const updateBuyer = (k: keyof BuyerDetails, v: string) =>
    setBuyer((prev) => ({ ...prev, [k]: v }));
  const updateQuartz = (k: keyof QuartzRequirement, v: boolean | string) =>
    setQuartz((prev) => ({ ...prev, [k]: v }));
  const updateChemical = (k: keyof ChemicalSpecs, v: string) =>
    setChemical((prev) => ({ ...prev, [k]: v }));
  const updateQuantity = (k: keyof QuantityRequirement, v: string) =>
    setQuantity((prev) => ({ ...prev, [k]: v }));
  const updatePacking = (k: keyof PackingDetails, v: boolean | string) =>
    setPacking((prev) => ({ ...prev, [k]: v }));
  const updateDelivery = (k: keyof DeliveryTerms, v: string) =>
    setDelivery((prev) => ({ ...prev, [k]: v }));
  const updateDocuments = (k: keyof DocumentsRequired, v: boolean) =>
    setDocuments((prev) => ({ ...prev, [k]: v }));
  const updateDeclaration = (k: keyof Declaration, v: boolean | string) =>
    setDeclaration((prev) => ({ ...prev, [k]: v }));

  const updateApplicationGlass = (k: keyof ApplicationEndUse["glass"], v: boolean) =>
    setApplication((prev) => ({
      ...prev,
      glass: { ...prev.glass, [k]: v },
    }));
  const updateApplicationCeramic = (k: keyof ApplicationEndUse["ceramic"], v: boolean) =>
    setApplication((prev) => ({
      ...prev,
      ceramic: { ...prev.ceramic, [k]: v },
    }));
  const updateApplicationFoundry = (k: keyof ApplicationEndUse["foundry"], v: boolean) =>
    setApplication((prev) => ({
      ...prev,
      foundry: { ...prev.foundry, [k]: v },
    }));
  const updateApplicationConstruction = (k: keyof ApplicationEndUse["construction"], v: boolean) =>
    setApplication((prev) => ({
      ...prev,
      construction: { ...prev.construction, [k]: v },
    }));
  const updateApplicationSolar = (k: keyof ApplicationEndUse["solar"], v: boolean) =>
    setApplication((prev) => ({
      ...prev,
      solar: { ...prev.solar, [k]: v },
    }));
  const updateApplicationSemiconductor = (k: keyof ApplicationEndUse["semiconductor"], v: boolean) =>
    setApplication((prev) => ({
      ...prev,
      semiconductor: { ...prev.semiconductor, [k]: v },
    }));
  const updateApplicationCrucible = (k: keyof ApplicationEndUse["crucible"], v: boolean) =>
    setApplication((prev) => ({
      ...prev,
      crucible: { ...prev.crucible, [k]: v },
    }));
  const updateApplicationOther = (k: keyof ApplicationEndUse["otherSpecialized"], v: boolean | string) =>
    setApplication((prev) => ({
      ...prev,
      otherSpecialized: { ...prev.otherSpecialized, [k]: v },
    }));

  const buildPayload = (): QuartzInquiryPayload => ({
    section1_buyerCompanyDetails: {
      companyName: buyer.companyName,
      contactPersonName: buyer.contactPersonName,
      designation: buyer.designation,
      email: buyer.email,
      mobileWhatsApp: buyer.mobileWhatsApp,
      companyAddress: buyer.companyAddress,
      country: buyer.country,
    },
    section2_quartzRequirementDetails: {
      typeOfQuartz: {
        rawQuartz: quartz.typeRawQuartz,
        lumps: quartz.typeLumps,
        grits: quartz.typeGrits,
        powder: quartz.typePowder,
        highPurityQuartzHPQ: quartz.typeHPQ,
      },
      gradePurity: {
        "95%": quartz.grade95,
        "97%": quartz.grade97,
        "98%": quartz.grade98,
        "99%": quartz.grade99,
        "99.9%": quartz.grade999,
        other: quartz.gradeOther ? quartz.gradeOtherText : undefined,
      },
      color: {
        milkyWhite: quartz.colorMilkyWhite,
        snowWhite: quartz.colorSnowWhite,
        crystal: quartz.colorCrystal,
        other: quartz.colorOther ? quartz.colorOtherText : undefined,
      },
      sizeSpecification: quartz.sizeSpecification,
    },
    section3_chemicalSpecifications: chemical,
    section4_quantityRequirement: {
      requiredQuantity: quantity.requiredQuantity,
      quantityUnit: quantity.quantityUnit,
      monthlyOrOneTime: quantity.monthlyOrOneTime,
      trialQuantity: quantity.trialQuantity || undefined,
    },
    section5_packingDetails: {
      jumboBags1MT: packing.jumboBags,
      ppBags25_50kg: packing.ppBags,
      bulk: packing.bulk,
      customPacking: packing.customPacking ? packing.customPackingText : undefined,
    },
    section6_deliveryTradeTerms: delivery,
    section7_applicationEndUse: application,
    section8_documentsRequired: documents,
    section9_additionalRemarks: additionalRemarks,
    section10_declaration: declaration,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse({
      companyName: buyer.companyName,
      contactPersonName: buyer.contactPersonName,
      email: buyer.email,
      mobileWhatsApp: buyer.mobileWhatsApp,
      confirmation: declaration.confirmation,
      declarationName: declaration.name,
      declarationDate: declaration.date,
    });
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = buildPayload();
      await submitQuartzInquiry(payload);
      toast({
        title: "Inquiry Submitted",
        description: "Thank you. We will get back to you shortly.",
      });
      setBuyer(initialBuyer);
      setQuartz(initialQuartz);
      setChemical(initialChemical);
      setQuantity(initialQuantity);
      setPacking(initialPacking);
      setDelivery(initialDelivery);
      setApplication(initialApplication);
      setDocuments(initialDocuments);
      setAdditionalRemarks("");
      setDeclaration({ confirmation: false, name: "", date: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { icon: MapPin, title: "Our Office", content: COMPANY_INFO.address },
    { icon: Phone, title: "Phone Number", content: COMPANY_INFO.phone, link: `tel:${COMPANY_INFO.phone}` },
    { icon: Clock, title: "Working Hours", content: "Mon - Sat: 9:00 AM - 6:00 PM" },
    { icon: Mail, title: "Email", content: COMPANY_INFO.email, link: `mailto:${COMPANY_INFO.email}` },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 relative overflow-hidden">
        <ParallaxBackground imageSrc={bgContact} overlay="bg-primary/80" speed={0.3} />
        <div className="container relative z-10 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Quartz Requirement Inquiry
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            For export and industrial buyers. Submit your requirements and we will respond promptly.
          </p>
        </div>
      </section>

      <section className="py-16 bg-navy-dark">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="grid grid-cols-2 gap-4">
              {contactCards.map((card, index) => (
                <Card key={index} className="bg-background border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[180px]">
                    <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center mb-4">
                      <card.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{card.title}</h3>
                    {card.link ? (
                      <a href={card.link} className="text-sm text-muted-foreground hover:text-primary transition-colors text-center leading-relaxed">
                        {card.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">{card.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-background border-0 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Quartz Requirement Inquiry Form
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                  <Accordion type="multiple" defaultValue={["section1"]} className="w-full text-left">
                    {/* 1. Buyer / Company Details */}
                    <AccordionItem value="section1" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        1. Buyer / Company Details
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div>
                          <Label>Company Name <span className="text-destructive">*</span></Label>
                          <Input value={buyer.companyName} onChange={(e) => updateBuyer("companyName", e.target.value)} placeholder="Company Name" required className="mt-1" />
                        </div>
                        <div>
                          <Label>Contact Person Name <span className="text-destructive">*</span></Label>
                          <Input value={buyer.contactPersonName} onChange={(e) => updateBuyer("contactPersonName", e.target.value)} placeholder="Contact Person Name" required className="mt-1" />
                        </div>
                        <div>
                          <Label>Designation</Label>
                          <Input value={buyer.designation} onChange={(e) => updateBuyer("designation", e.target.value)} placeholder="Designation" className="mt-1" />
                        </div>
                        <div>
                          <Label>Email ID <span className="text-destructive">*</span></Label>
                          <Input type="email" value={buyer.email} onChange={(e) => updateBuyer("email", e.target.value)} placeholder="Email" required className="mt-1" />
                        </div>
                        <div>
                          <Label>Mobile / WhatsApp No. <span className="text-destructive">*</span></Label>
                          <Input value={buyer.mobileWhatsApp} onChange={(e) => updateBuyer("mobileWhatsApp", e.target.value)} placeholder="Mobile / WhatsApp" required className="mt-1" />
                        </div>
                        <div>
                          <Label>Company Address</Label>
                          <Textarea value={buyer.companyAddress} onChange={(e) => updateBuyer("companyAddress", e.target.value)} placeholder="Company Address" rows={3} className="mt-1" />
                        </div>
                        <div>
                          <Label>Country</Label>
                          <select value={buyer.country} onChange={(e) => updateBuyer("country", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option value="">Select Country</option>
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 2. Quartz Requirement Details */}
                    <AccordionItem value="section2" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        2. Quartz Requirement Details
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div>
                          <Label className="block mb-2">Type of Quartz Required</Label>
                          <div className="space-y-2">
                            {[
                              { key: "typeRawQuartz" as const, label: "Raw Quartz" },
                              { key: "typeLumps" as const, label: "Lumps" },
                              { key: "typeGrits" as const, label: "Grits" },
                              { key: "typePowder" as const, label: "Powder" },
                              { key: "typeHPQ" as const, label: "High Purity Quartz (HPQ)" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={quartz[key]} onCheckedChange={(c) => updateQuartz(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="block mb-2">Grade / Purity (% SiO₂)</Label>
                          <div className="space-y-2">
                            {[
                              { key: "grade95" as const, label: "95%" },
                              { key: "grade97" as const, label: "97%" },
                              { key: "grade98" as const, label: "98%" },
                              { key: "grade99" as const, label: "99%" },
                              { key: "grade999" as const, label: "99.9%" },
                              { key: "gradeOther" as const, label: "Other" },
                            ].map(({ key, label }) => (
                              <div key={key} className="flex items-center gap-2">
                                <Checkbox checked={quartz[key as keyof QuartzRequirement] as boolean} onCheckedChange={(c) => updateQuartz(key, !!c)} />
                                <span className="text-sm">{label}</span>
                                {key === "gradeOther" && quartz.gradeOther && (
                                  <Input value={quartz.gradeOtherText} onChange={(e) => updateQuartz("gradeOtherText", e.target.value)} placeholder="Specify" className="max-w-[180px] ml-2" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="block mb-2">Color</Label>
                          <div className="space-y-2">
                            {[
                              { key: "colorMilkyWhite" as const, label: "Milky White" },
                              { key: "colorSnowWhite" as const, label: "Snow White" },
                              { key: "colorCrystal" as const, label: "Crystal" },
                              { key: "colorOther" as const, label: "Other" },
                            ].map(({ key, label }) => (
                              <div key={key} className="flex items-center gap-2">
                                <Checkbox checked={quartz[key] as boolean} onCheckedChange={(c) => updateQuartz(key, !!c)} />
                                <span className="text-sm">{label}</span>
                                {key === "colorOther" && quartz.colorOther && (
                                  <Input value={quartz.colorOtherText} onChange={(e) => updateQuartz("colorOtherText", e.target.value)} placeholder="Specify" className="max-w-[180px] ml-2" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Size Specification</Label>
                          <Input value={quartz.sizeSpecification} onChange={(e) => updateQuartz("sizeSpecification", e.target.value)} placeholder="Size Specification" className="mt-1" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 3. Chemical Specifications */}
                    <AccordionItem value="section3" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        3. Chemical Specifications
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 pr-4 font-medium">Parameter</th>
                                <th className="text-left py-2">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { key: "sio2" as const, label: "SiO₂" },
                                { key: "fe2o3" as const, label: "Fe₂O₃" },
                                { key: "al2o3" as const, label: "Al₂O₃" },
                                { key: "tio2" as const, label: "TiO₂" },
                                { key: "cao" as const, label: "CaO" },
                                { key: "mgo" as const, label: "MgO" },
                              ].map(({ key, label }) => (
                                <tr key={key} className="border-b">
                                  <td className="py-2 pr-4">{label}</td>
                                  <td className="py-2">
                                    <Input value={chemical[key]} onChange={(e) => updateChemical(key, e.target.value)} placeholder="%" className="max-w-[120px]" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 4. Quantity Requirement */}
                    <AccordionItem value="section4" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        4. Quantity Requirement
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div className="flex flex-wrap gap-2 items-end">
                          <div className="flex-1 min-w-[120px]">
                            <Label>Required Quantity</Label>
                            <Input type="number" min={0} value={quantity.requiredQuantity} onChange={(e) => updateQuantity("requiredQuantity", e.target.value)} placeholder="Quantity" className="mt-1" />
                          </div>
                          <div className="w-[100px]">
                            <Label>Unit</Label>
                            <select value={quantity.quantityUnit} onChange={(e) => updateQuantity("quantityUnit", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                              <option value="MT">MT</option>
                              <option value="kg">kg</option>
                              <option value="tons">tons</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <Label className="block mb-2">Monthly / One-time Requirement</Label>
                          <RadioGroup value={quantity.monthlyOrOneTime} onValueChange={(v) => updateQuantity("monthlyOrOneTime", v as "monthly" | "one_time")} className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <RadioGroupItem value="monthly" />
                              <span>Monthly</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <RadioGroupItem value="one_time" />
                              <span>One-time</span>
                            </label>
                          </RadioGroup>
                        </div>
                        <div>
                          <Label>Trial Quantity (optional)</Label>
                          <Input value={quantity.trialQuantity} onChange={(e) => updateQuantity("trialQuantity", e.target.value)} placeholder="Trial Quantity" className="mt-1" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 5. Packing Details */}
                    <AccordionItem value="section5" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        5. Packing Details
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div className="space-y-2">
                          {[
                            { key: "jumboBags" as const, label: "Jumbo Bags (1 MT)" },
                            { key: "ppBags" as const, label: "PP Bags (25 / 50 kg)" },
                            { key: "bulk" as const, label: "Bulk" },
                            { key: "customPacking" as const, label: "Custom Packing" },
                          ].map(({ key, label }) => (
                            <div key={key}>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={packing[key] as boolean} onCheckedChange={(c) => updatePacking(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                              {key === "customPacking" && packing.customPacking && (
                                <Textarea value={packing.customPackingText} onChange={(e) => updatePacking("customPackingText", e.target.value)} placeholder="Specify custom packing" rows={2} className="mt-2 ml-6 max-w-md" />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 6. Delivery & Trade Terms */}
                    <AccordionItem value="section6" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        6. Delivery & Trade Terms
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div>
                          <Label>Delivery Term</Label>
                          <select value={delivery.deliveryTerm} onChange={(e) => updateDelivery("deliveryTerm", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Select</option>
                            <option value="EXW">EXW</option>
                            <option value="FOB">FOB</option>
                            <option value="CIF">CIF</option>
                            <option value="CFR">CFR</option>
                          </select>
                        </div>
                        <div>
                          <Label>Port of Delivery</Label>
                          <Input value={delivery.portOfDelivery} onChange={(e) => updateDelivery("portOfDelivery", e.target.value)} placeholder="Port of Delivery" className="mt-1" />
                        </div>
                        <div>
                          <Label>Target Price (optional)</Label>
                          <Input value={delivery.targetPrice} onChange={(e) => updateDelivery("targetPrice", e.target.value)} placeholder="Target Price" className="mt-1" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 7. Application / End Use */}
                    <AccordionItem value="section7" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        7. Application / End Use
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">A. Glass Industry</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "container" as const, label: "Container Glass" },
                              { key: "float" as const, label: "Float Glass" },
                              { key: "specialty" as const, label: "Specialty Glass" },
                              { key: "optical" as const, label: "Optical Glass" },
                              { key: "fiberglass" as const, label: "Fiberglass" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={application.glass[key]} onCheckedChange={(c) => updateApplicationGlass(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">B. Ceramic Industry</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "tiles" as const, label: "Tiles" },
                              { key: "sanitary" as const, label: "Sanitary Ware" },
                              { key: "tableware" as const, label: "Tableware" },
                              { key: "technical" as const, label: "Technical / Advanced Ceramics" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={application.ceramic[key]} onCheckedChange={(c) => updateApplicationCeramic(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">C. Foundry Industry</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "moldingSand" as const, label: "Molding Sand" },
                              { key: "coreMaking" as const, label: "Core Making" },
                              { key: "refractory" as const, label: "Refractory Applications" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={application.foundry[key]} onCheckedChange={(c) => updateApplicationFoundry(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">D. Construction & Paint</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "chemicals" as const, label: "Construction Chemicals" },
                              { key: "paints" as const, label: "Paints & Coatings" },
                              { key: "flooring" as const, label: "Flooring / Decorative Applications" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={application.construction[key]} onCheckedChange={(c) => updateApplicationConstruction(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">E. Solar Industry</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "mgSi" as const, label: "Metallurgical Grade Silicon (MG-Si)" },
                              { key: "solarGlass" as const, label: "Solar Glass" },
                              { key: "cruciblesIngot" as const, label: "Quartz Crucibles for Ingot Pulling" },
                              { key: "polysilicon" as const, label: "Polysilicon Manufacturing" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={application.solar[key]} onCheckedChange={(c) => updateApplicationSolar(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">F. Semiconductor / Electronics</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "hpqFeedstock" as const, label: "HPQ Feedstock" },
                              { key: "fusedQuartz" as const, label: "Fused Quartz Products" },
                              { key: "waferProcessing" as const, label: "Wafer Processing" },
                              { key: "etchingFurnaces" as const, label: "Etching & Diffusion Furnaces" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={application.semiconductor[key]} onCheckedChange={(c) => updateApplicationSemiconductor(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">G. Crucible Applications</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "solarGrade" as const, label: "Quartz Crucibles – Solar Grade" },
                              { key: "semiconductorGrade" as const, label: "Quartz Crucibles – Semiconductor Grade" },
                              { key: "czMethod" as const, label: "CZ Method" },
                              { key: "monocrystalline" as const, label: "Monocrystalline Silicon" },
                              { key: "polycrystalline" as const, label: "Polycrystalline Silicon" },
                            ].map(({ key, label }) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={application.crucible[key]} onCheckedChange={(c) => updateApplicationCrucible(key, !!c)} />
                                <span className="text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="pl-0">
                          <p className="font-medium text-foreground mb-2">H. Other Specialized Applications</p>
                          <div className="pl-4 space-y-1">
                            {[
                              { key: "lighting" as const, label: "Lighting Industry" },
                              { key: "laboratory" as const, label: "Laboratory Ware" },
                              { key: "refractories" as const, label: "Refractories" },
                              { key: "other" as const, label: "Other" },
                            ].map(({ key, label }) => (
                              <div key={key}>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <Checkbox checked={application.otherSpecialized[key as keyof ApplicationEndUse["otherSpecialized"]] as boolean} onCheckedChange={(c) => updateApplicationOther(key, !!c)} />
                                  <span className="text-sm">{label}</span>
                                </label>
                                {key === "other" && application.otherSpecialized.other && (
                                  <Input value={application.otherSpecialized.otherText} onChange={(e) => updateApplicationOther("otherText", e.target.value)} placeholder="Specify" className="mt-2 ml-6 max-w-md" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* 8. Documents Required */}
                    <AccordionItem value="section8" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        8. Documents Required
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 pt-2">
                        {[
                          { key: "coa" as const, label: "COA" },
                          { key: "msds" as const, label: "MSDS" },
                          { key: "originCertificate" as const, label: "Origin Certificate" },
                          { key: "sample" as const, label: "Sample" },
                        ].map(({ key, label }) => (
                          <label key={key} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox checked={documents[key]} onCheckedChange={(c) => updateDocuments(key, !!c)} />
                            <span className="text-sm">{label}</span>
                          </label>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* 9. Additional Remarks */}
                    <AccordionItem value="section9" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        9. Additional Remarks
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <Textarea value={additionalRemarks} onChange={(e) => setAdditionalRemarks(e.target.value)} placeholder="Additional remarks..." rows={5} className="w-full" />
                      </AccordionContent>
                    </AccordionItem>

                    {/* 10. Declaration */}
                    <AccordionItem value="section10" className="border rounded-lg px-4 mb-2 bg-muted/30">
                      <AccordionTrigger className="hover:no-underline font-semibold text-foreground">
                        10. Declaration
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <Checkbox checked={declaration.confirmation} onCheckedChange={(c) => updateDeclaration("confirmation", !!c)} className="mt-0.5" />
                          <span className="text-sm">I confirm that the information provided is correct and complete. <span className="text-destructive">*</span></span>
                        </label>
                        <div>
                          <Label>Name <span className="text-destructive">*</span></Label>
                          <Input value={declaration.name} onChange={(e) => updateDeclaration("name", e.target.value)} placeholder="Name" required className="mt-1" />
                        </div>
                        <div>
                          <Label>Date <span className="text-destructive">*</span></Label>
                          <Input type="date" value={declaration.date} onChange={(e) => updateDeclaration("date", e.target.value)} required className="mt-1" />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="pt-4">
                    <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12">
                      {loading ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="bg-[#25D366] border-0">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-display font-semibold text-lg text-white mb-1">Prefer WhatsApp?</h3>
                  <p className="text-white/80 text-sm">Chat with us instantly for quick responses.</p>
                </div>
                <Button asChild className="bg-white text-[#25D366] hover:bg-white/90 font-semibold">
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
