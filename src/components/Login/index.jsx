"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Globe } from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

const Login = ({ className, ...props }) => { 
  const { lang } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const [loading, setLoading] = useState(false);

  const onLanguageToggle = () => {
    const newLang = lang === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("login.errors.invalidEmail"))
        .required(t("login.errors.emailRequired")),
      password: Yup.string()
        .min(6, t("login.errors.passwordMin"))
        .required(t("login.errors.passwordRequired")),
    }),
    onSubmit: (values) => {
      setLoading(true);
      console.log("Form values:", values);
      router.push('/')
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {/* Title + Language Switcher */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t("login.title")}</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={onLanguageToggle}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {t("common.langToggle")}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            {t("login.subtitle")}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">{t("login.emailLabel")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("login.emailPlaceholder")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">{t("login.passwordLabel")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? t("login.submitting")
                    : t("login.submit")}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
