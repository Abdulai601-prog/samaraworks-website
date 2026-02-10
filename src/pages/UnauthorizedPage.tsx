import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
      <div className="max-w-xl mx-auto px-6 lg:px-12">
        <div className="samara-tile p-8 lg:p-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-2">
            Access Denied
          </h1>
          <p className="text-[#6E6A63] mb-6">
            You don’t have permission to view this page.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button asChild className="samara-btn-primary">
              <Link to="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          <p className="text-sm text-[#6E6A63] mt-6">
            Need access? Email{" "}
            <a className="underline" href="mailto:info@samaraworks.org">
              info@samaraworks.org
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
