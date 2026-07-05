import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  Bold,
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  CreditCard,
  Italic,
  LifeBuoy,
  LogOut,
  Mail,
  Moon,
  Plus,
  Settings,
  Sun,
  Underline,
  User,
} from "lucide-react";

import { RootState } from "@/redux/store";
import { setMode } from "@/redux/slices/themeSlice";
import { cn } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { toast as sonnerToast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

/* ------------------------------------------------------------------ */
/* Layout helpers                                                     */
/* ------------------------------------------------------------------ */

const Section = ({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 space-y-4">
    <div className="space-y-1">
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    <div className="rounded-lg border bg-card/50 p-6">{children}</div>
    <Separator />
  </section>
);

const Row = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("flex flex-wrap items-center gap-4", className)}>
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Palette data (from README.md style guide)                          */
/* ------------------------------------------------------------------ */

const PALETTE: { name: string; hex: string; className: string }[] = [
  { name: "Green", hex: "#50C878", className: "bg-brand-green" },
  { name: "Orange", hex: "#FB9A54", className: "bg-brand-orange" },
  { name: "Blue", hex: "#00C5FF", className: "bg-brand-blue" },
  { name: "Dark Green", hex: "#2D8F4E", className: "bg-brand-dark-green" },
  { name: "Light Green", hex: "#73D393", className: "bg-brand-light-green" },
  { name: "Lightest Green", hex: "#B9E9C9", className: "bg-brand-lightest-green" },
  { name: "Purple", hex: "#A459FF", className: "bg-brand-purple" },
  { name: "Yellow", hex: "#FFEB3B", className: "bg-brand-yellow" },
  { name: "Magenta", hex: "#FF4081", className: "bg-brand-magenta" },
  { name: "Teal", hex: "#20C997", className: "bg-brand-teal" },
  { name: "Navy", hex: "#1A1A40", className: "bg-brand-navy" },
];

const TOKENS = [
  "bg-background",
  "bg-foreground",
  "bg-primary",
  "bg-secondary",
  "bg-muted",
  "bg-accent",
  "bg-destructive",
  "bg-card",
  "bg-border",
];

/* ------------------------------------------------------------------ */
/* Chart demo data                                                    */
/* ------------------------------------------------------------------ */

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 264, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

/* ------------------------------------------------------------------ */
/* Form demo schema                                                   */
/* ------------------------------------------------------------------ */

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
});

function ProfileForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Form submitted",
      description: `Welcome, ${values.username}!`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="peterluong" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export const StyleGuidePage = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [progress, setProgress] = React.useState(24);
  const [sliderVal, setSliderVal] = React.useState([50]);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [otp, setOtp] = React.useState("");

  React.useEffect(() => {
    const t = setTimeout(() => setProgress(66), 600);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () =>
    dispatch(setMode(theme === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SonnerToaster />
      <Toaster />

      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-heading text-xl font-bold">
              peterluong.dev · Component Library
            </h1>
            <p className="text-xs text-muted-foreground">
              shadcn/ui reimplemented on the brand style guide
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle {theme === "dark" ? "light" : "dark"} mode</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-6 py-10">
        {/* Colors */}
        <Section
          id="colors"
          title="Colors"
          description="Brand palette from the style guide, plus the semantic tokens derived from it."
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Brand palette
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {PALETTE.map((c) => (
                  <div key={c.name} className="space-y-1.5">
                    <div
                      className={cn(
                        "h-16 w-full rounded-md border",
                        c.className
                      )}
                    />
                    <div className="text-xs font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.hex}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Semantic tokens
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
                {TOKENS.map((t) => (
                  <div key={t} className="space-y-1.5">
                    <div className={cn("h-12 w-full rounded-md border", t)} />
                    <div className="truncate text-[10px] text-muted-foreground">
                      {t.replace("bg-", "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section
          id="typography"
          title="Typography"
          description="Poppins for headings, Nunito Sans for body."
        >
          <div className="space-y-3">
            <h1 className="font-heading text-4xl font-bold">Heading 1 · Poppins</h1>
            <h2 className="font-heading text-3xl font-semibold">Heading 2 · Poppins</h2>
            <h3 className="font-heading text-2xl font-semibold">Heading 3 · Poppins</h3>
            <p className="max-w-2xl leading-relaxed">
              Body text is set in Nunito Sans. The quick brown fox jumps over the
              lazy dog. Nunito Sans balances the geometric boldness of Poppins with
              softer, highly legible letterforms for long-form reading.
            </p>
            <p className="text-sm text-muted-foreground">
              Muted small text — for captions and helper copy.
            </p>
            <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
              "Design is intelligence made visible."
            </blockquote>
            <code className="rounded bg-muted px-1.5 py-1 text-sm">
              const brand = "#50C878";
            </code>
          </div>
        </Section>

        {/* Buttons */}
        <Section id="buttons" title="Button" description="All variants and sizes.">
          <div className="space-y-4">
            <Row>
              <Button>Default</Button>
              <Button variant="brand">Brand CTA</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </Row>
            <Row>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Add">
                <Plus />
              </Button>
              <Button>
                <Mail /> With icon
              </Button>
              <Button disabled>Disabled</Button>
            </Row>
          </div>
        </Section>

        {/* Badges */}
        <Section id="badges" title="Badge">
          <Row>
            <Badge>Default</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </Row>
        </Section>

        {/* Inputs & form controls */}
        <Section
          id="inputs"
          title="Inputs & Controls"
          description="Text fields and selection controls."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Email</Label>
                <Input id="demo-input" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-textarea">Message</Label>
                <Textarea id="demo-textarea" placeholder="Type your message..." />
              </div>
              <div className="space-y-2">
                <Label>Framework</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Frontend</SelectLabel>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                      <SelectItem value="solid">Solid</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>One-time password</Label>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Checkbox id="terms" defaultChecked />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="airplane" defaultChecked />
                <Label htmlFor="airplane">Airplane mode</Label>
              </div>
              <div className="space-y-2">
                <Label>Notify me about…</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1">All new messages</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="mentions" id="r2" />
                    <Label htmlFor="r2">Direct messages & mentions</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="none" id="r3" />
                    <Label htmlFor="r3">Nothing</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Volume ({sliderVal[0]})</Label>
                <Slider
                  value={sliderVal}
                  onValueChange={setSliderVal}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Toggles</Label>
                <Row>
                  <Toggle aria-label="Bold">
                    <Bold />
                  </Toggle>
                  <ToggleGroup type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Bold">
                      <Bold />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Italic">
                      <Italic />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="underline" aria-label="Underline">
                      <Underline />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Row>
              </div>
            </div>
          </div>
        </Section>

        {/* Form */}
        <Section
          id="form"
          title="Form"
          description="react-hook-form + zod validation, wired to the toast."
        >
          <ProfileForm />
        </Section>

        {/* Cards */}
        <Section id="cards" title="Card">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one click.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="proj">Name</Label>
                <Input id="proj" placeholder="my-app" />
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline">Cancel</Button>
                <Button variant="brand">Deploy</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>PL</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">Peter Luong</p>
                    <p className="text-muted-foreground">Pushed a new commit</p>
                  </div>
                  <Badge variant="brand" className="ml-auto">
                    New
                  </Badge>
                </div>
                <Progress value={progress} />
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Alerts */}
        <Section id="alerts" title="Alert">
          <div className="space-y-4">
            <Alert>
              <CreditCard className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the library.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <LifeBuoy className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* Accordion + Tabs */}
        <Section id="disclosure" title="Accordion & Tabs">
          <div className="grid gap-8 md:grid-cols-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes, it matches the peterluong.dev brand tokens out of the box.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes, with smooth expand/collapse transitions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-2 pt-2">
                <p className="text-sm text-muted-foreground">
                  Make changes to your account here.
                </p>
                <Input placeholder="Name" defaultValue="Peter Luong" />
              </TabsContent>
              <TabsContent value="password" className="space-y-2 pt-2">
                <p className="text-sm text-muted-foreground">
                  Change your password here.
                </p>
                <Input type="password" placeholder="New password" />
              </TabsContent>
            </Tabs>
          </div>
        </Section>

        {/* Overlays */}
        <Section
          id="overlays"
          title="Overlays & Menus"
          description="Dialog, alert dialog, sheet, drawer, popover, hover card, tooltip, dropdown, context menu, menubar."
        >
          <Row>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="d-name">Name</Label>
                  <Input id="d-name" defaultValue="Peter Luong" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="brand">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-2 py-4">
                  <Label htmlFor="s-name">Name</Label>
                  <Input id="s-name" defaultValue="Peter Luong" />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="brand">Save</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Move goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button variant="brand">Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2">
                <p className="font-medium">Dimensions</p>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
                <div className="flex items-center gap-2">
                  <Label htmlFor="w" className="w-16">
                    Width
                  </Label>
                  <Input id="w" defaultValue="100%" className="h-8" />
                </div>
              </PopoverContent>
            </Popover>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@peterluong</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>PL</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-semibold">Peter Luong</p>
                    <p className="text-muted-foreground">
                      Building peterluong.dev.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>Add to library</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Dropdown</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User /> Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ContextMenu>
              <ContextMenuTrigger className="flex h-10 items-center rounded-md border border-dashed px-4 text-sm text-muted-foreground">
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  Back
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Forward</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Reload</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Undo</MenubarItem>
                  <MenubarItem>Redo</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </Row>
        </Section>

        {/* Command */}
        <Section id="command" title="Command" description="Command palette (cmdk).">
          <Command className="max-w-md rounded-lg border shadow-sm">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <CalendarIcon /> Calendar
                </CommandItem>
                <CommandItem>
                  <User /> Profile
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Settings /> Settings
                </CommandItem>
                <CommandItem>
                  <CreditCard /> Billing
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Section>

        {/* Data display */}
        <Section id="data" title="Table & Data Display">
          <div className="space-y-8">
            <Table>
              <TableCaption>A list of recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["INV001", "Paid", "Credit Card", "$250.00"],
                  ["INV002", "Pending", "PayPal", "$150.00"],
                  ["INV003", "Unpaid", "Bank Transfer", "$350.00"],
                ].map(([inv, status, method, amount]) => (
                  <TableRow key={inv}>
                    <TableCell className="font-medium">{inv}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          status === "Paid"
                            ? "brand"
                            : status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>{method}</TableCell>
                    <TableCell className="text-right">{amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Skeleton</p>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Aspect ratio (16:9)</p>
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-green to-brand-blue text-white">
                    16 / 9
                  </div>
                </AspectRatio>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Scroll area</p>
                <ScrollArea className="h-28 w-full rounded-md border p-3 text-sm">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="py-1">
                      Row {i + 1}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </div>
        </Section>

        {/* Navigation */}
        <Section id="navigation" title="Breadcrumb & Pagination">
          <div className="space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Style Guide</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Section>

        {/* Carousel + Calendar + Resizable */}
        <Section id="advanced" title="Carousel, Calendar & Resizable">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Carousel</p>
              <Carousel className="mx-auto w-full max-w-xs">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem key={i}>
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="font-heading text-4xl font-semibold">
                            {i + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">
                Date picker (Popover + Calendar)
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 md:col-span-2">
              <p className="text-sm font-medium">Resizable panels</p>
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[160px] max-w-full rounded-lg border"
              >
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-6 text-sm">
                    One
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6 text-sm">
                        Two
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6 text-sm">
                        Three
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </Section>

        {/* Charts */}
        <Section
          id="charts"
          title="Charts"
          description="Recharts wrapped with themed tooltips and legends, using the brand chart tokens."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Bar chart</p>
              <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Area chart</p>
              <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
                <AreaChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </Section>

        {/* Toasts */}
        <Section
          id="toasts"
          title="Toasts"
          description="Both the Radix-based toaster and Sonner are wired to the theme."
        >
          <Row>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: "Scheduled: Catch up",
                  description: "Friday, February 10, 2026 at 5:57 PM",
                })
              }
            >
              Show toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                sonnerToast.success("Event has been created", {
                  description: "Sunday, December 03, 2026 at 9:00 AM",
                })
              }
            >
              Show Sonner toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                sonnerToast.error("Something went wrong", {
                  description: "Please try again later.",
                })
              }
            >
              Sonner error
            </Button>
          </Row>
        </Section>

        <footer className="pb-16 pt-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            <Check className="h-4 w-4 text-brand-green" />
            {47} components · reimplemented for peterluong.dev
          </div>
        </footer>
      </main>
    </div>
  );
};
