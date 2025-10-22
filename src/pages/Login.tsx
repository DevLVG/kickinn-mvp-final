import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signInError) throw signInError;

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.message?.includes("Email rate limit exceeded")) {
        const waitTime = Math.ceil(parseInt(err.message.match(/\d+/)?.[0] || "60") / 60);
        setError(`Too many attempts. Try again in ${waitTime} minutes.`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signInError) throw signInError;
      toast.success("Login link resent successfully!");
    } catch (err: any) {
      console.error("Resend error:", err);
      toast.error("Failed to resend link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)",
      }}
    >
      <div className="w-full max-w-[500px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <h2
              className="text-2xl md:text-3xl font-bold text-white tracking-wider cursor-pointer hover:opacity-90 transition-opacity inline-block"
              style={{ textShadow: "0 0 30px rgba(103, 159, 131, 0.5)" }}
            >
              KICK INN
            </h2>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(103, 159, 131, 0.2)",
            boxShadow: "0 8px 32px rgba(15, 43, 56, 0.3)",
          }}
        >
          {!isSubmitted ? (
            <>
              <h1 className="text-3xl font-bold text-white text-center mb-3">
                Welcome Back
              </h1>
              <p className="text-base text-white/70 text-center mb-8">
                Enter your email to log in
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-white mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onBlur={() => {
                      if (email && !validateEmail(email)) {
                        setError("Please enter a valid email address");
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-white placeholder:text-white/40 
                      ${error ? "border-destructive" : "border-secondary-teal/30"}
                      focus:border-secondary-teal focus:ring-2 focus:ring-secondary-teal/50`}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                    }}
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className="text-destructive text-xs mt-2" role="alert">
                      {error}
                      {error.includes("No account found") && (
                        <>
                          {" "}
                          <Link to="/register" className="underline text-light-teal hover:opacity-100">
                            Create an account?
                          </Link>
                        </>
                      )}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !!error}
                  className="w-full py-3.5 text-base font-medium text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(to right, #679f83, #23698a)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && !error) {
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(103, 159, 131, 0.4)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Login Link"
                  )}
                </Button>
              </form>

              <p className="text-sm text-white/60 text-center mt-6">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-light-teal underline hover:opacity-100 transition-opacity"
                >
                  Sign up
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-5xl mb-4">✉️</div>
              <h2 className="text-2xl font-bold text-white mb-3">Check Your Email</h2>
              <p className="text-sm text-white/70 mb-2">
                We've sent a login link to <span className="font-medium text-white">{email}</span>.
                Click the link to continue.
              </p>
              <p className="text-xs text-white/60">Link expires in 15 minutes</p>
              <Button
                onClick={handleResend}
                disabled={isSubmitting}
                variant="outline"
                className="mt-6 px-6 py-3 rounded-lg border border-secondary-teal/50 text-secondary-teal hover:bg-secondary-teal/10 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  "Resend Link"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;