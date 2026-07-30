import { Code2, ExternalLink } from "lucide-react"

import { templates } from "@/components/templates/registry"
import { SourceViewer } from "@/components/templates/SourceViewer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TemplatesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Templates</h1>
      <p className="mt-1 text-muted-foreground">
        Browse the pages and building blocks that ship with this admin template.
      </p>

      <Tabs defaultValue="pages" className="mt-6 w-full">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <Card key={t.route} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{t.name}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-wrap items-start gap-1.5">
                  {t.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
                <CardFooter className="gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={t.route}>
                      Open
                      <ExternalLink data-icon="inline-end" />
                    </a>
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" size="sm">
                        <Code2 data-icon="inline-start" />
                        Code
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="w-full gap-0 sm:max-w-2xl"
                    >
                      <SheetHeader>
                        <SheetTitle>{t.name}</SheetTitle>
                        <SheetDescription className="font-mono">
                          {t.sourcePath}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="overflow-y-auto px-4 pb-4">
                        <SourceViewer filePath={t.sourcePath} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="components">
          <ComponentShowcase />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

const badgeVariants = [
  "default",
  "secondary",
  "outline",
  "destructive",
] as const

function ComponentShowcase() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Every visual variant.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status and label pills.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              Cards group related content and actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Use cards for dashboard widgets, summaries, and grouped forms.
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Action</Button>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Text fields in each state.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input defaultValue="Filled value" />
            <Input placeholder="Placeholder text" />
            <Input disabled placeholder="Disabled" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
