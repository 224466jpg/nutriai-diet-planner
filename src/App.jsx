import { useState, useEffect } from "react";
import Groq from "groq-sdk";

function App() {
  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    goal: "weight_loss",
    activityLevel: "moderate",
    dietType: "vegetarian",
    country: "India",
    allergies: "",
    mealsPerDay: "3"
  });

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const generateDietPlan = async () => {
    setLoading(true);
    setShowModal(true);
    setShowForm(false);

    try {
      const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `
Generate a comprehensive personalized diet plan based on the following details:

Personal Information:
- Age: ${formData.age} years
- Weight: ${formData.weight} kg
- Height: ${formData.height} cm
- Gender: ${formData.gender}
- Goal: ${formData.goal.replace('_', ' ')}
- Activity Level: ${formData.activityLevel}
- Diet Type: ${formData.dietType}
- Country: ${formData.country}
- Allergies/Restrictions: ${formData.allergies || "None"}
- Preferred Meals Per Day: ${formData.mealsPerDay}

Please provide a detailed diet plan including:
1. BMI Calculation and Health Status
2. Daily Calorie Target (based on goal)
3. Macronutrients Breakdown (Protein, Carbs, Fats)
4. Complete Meal Plan:
   ${formData.mealsPerDay >= 3 ? '- Breakfast\n   - Lunch\n   - Dinner' : ''}
   ${formData.mealsPerDay >= 4 ? '   - Snack' : ''}
   ${formData.mealsPerDay >= 5 ? '   - Pre-Workout Meal\n   - Post-Workout Meal' : ''}
5. Hydration Guidelines
6. Supplement Recommendations (if needed)
7. Weekly Progress Tracking Tips
8. Food Alternatives and Meal Prep Ideas

Make it specific to ${formData.country} cuisine and ${formData.dietType} diet preferences.
            `,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

      setDietPlan(
        chatCompletion.choices[0]?.message?.content ||
          "No response received."
      );
    } catch (error) {
      console.error(error);
      setDietPlan("Error generating diet plan. Please check your API key.");
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.age || !formData.weight || !formData.height) {
      alert("Please fill in all required fields!");
      return;
    }
    generateDietPlan();
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .glass-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .vibrant-gradient {
          background: linear-gradient(135deg, #006c49 0%, #10b981 100%);
        }
        .vibrant-gradient-secondary {
          background: linear-gradient(135deg, #855300 0%, #fea619 100%);
        }
        .vibrant-gradient-tertiary {
          background: linear-gradient(135deg, #00687a 0%, #00b2d0 100%);
        }
        .glow-accent {
          position: absolute;
          filter: blur(80px);
          z-index: -1;
          opacity: 0.35;
          border-radius: 9999px;
        }
        .animate-fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      {/* TopNavBar */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 sticky top-0 z-50 shadow-sm">
        <nav className="flex justify-between items-center w-full px-margin-desktop max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-10">
            <span className="font-display-lg text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">
              NutriAI
            </span>
            <div className="hidden md:flex gap-8 items-center">
              <a className="text-primary font-bold border-b-2 border-primary font-label-md py-1" href="#">
                Planner
              </a>
              <a className="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="#">
                Tips
              </a>
              <a className="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="#">
                BMI Calculator
              </a>
              <a className="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="#">
                Dashboard
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all"
            >
              dark_mode
            </button>
            <button 
              onClick={() => setShowForm(true)}
              disabled={loading}
              className="vibrant-gradient text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-primary/30 transition-all scale-100 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Plan"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-32">
          <div className="glow-accent bg-primary-container w-[500px] h-[500px] -top-32 -left-32"></div>
          <div className="glow-accent bg-secondary-container w-[400px] h-[400px] top-1/2 -right-32"></div>
          
          <div className="max-w-7xl mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="animate-fade-in stagger-1">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6 tracking-wider">
                <span className="material-symbols-outlined text-sm">bolt</span> POWERED BY CLINICAL AI
              </div>
              <h1 className="font-display-lg text-5xl md:text-6xl text-on-surface mb-8">
                Your Personal AI <br/>
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">
                  Nutrition Coach
                </span>
              </h1>
              <p className="font-body-md text-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
                Personalized meal plans, BMI tracking, and expert health tips. Reach your fitness goals faster with our clinical-grade AI nutrition assistant.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowForm(true)}
                  disabled={loading}
                  className="vibrant-gradient text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Diet Plan"}
                </button>
                <button className="bg-white border-2 border-outline-variant text-on-surface px-8 py-4 rounded-2xl font-bold hover:bg-surface-container-low transition-all">
                  Explore Tips
                </button>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img alt="User 1" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCLRzufvkOseuxnVlY7qcjb_80YjiqF5Mv1-UPX7e6GZtaIBcFoQzY1zmRJ5LWzq4CQXYoDHSywY0ScZoRDBKNMn19fnHBjVCJv9XlqBpr9LPrRYZD-aEGMFuYciXHr5-ixOR0f8Hy9OJvb35WPJ1ehu15kbjoSR45UoPVRxRif_6ZwE7ZRw6oAsXnXRdPR34-RSXc6lXcIVYeIURaesW6se9MiKyVLjifoGV3bhioTGjfC2pH6pz40hCvNxVAX6sexISwhxJrR9qz"/>
                  <img alt="User 2" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhxJHbSzg32aRMYmQCoqZdRLlOTXJrkje_D_eFNxWvLvOnn4B0paZgrju5VbadvtPbtM1tZJkTOyFXBmFIB2j4AacYJe1jOBjooXKHoaxVdhDVHhJ6DybMud8yDSOYpvO0KcFD64Ra8xtIkGsrM7lP_mquYUDWjUR1uIt9AD5mNrLqH9hSM6KPKDyZQ04hwql9j4RSyPwtritXaLtOLAhqrM-1zUbcjFTjGg_uhJrUcFenyTxnbdtuX_yGwYxyFgG1NeDYHbfsLXMN"/>
                  <img alt="User 3" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbZsbErVa6ViVtK1qLKBopv8Pq84b_xQ0XGlEzg9EKHL-S4MH_JD-Ln6fnCMJUt-nGvGsYbeqm7uKzAgE8wYFpdAtjMNhrKUu8vgcrX4Dx2r80QajHIrNE3qA3thbD0mPJGfFq5Syx9XpaEdWSZcfr6YhI7LaIzKNos3I97BHjtcmk5_g8Vs98xonuqtK8QEcWHlX_X9bNdlgJ6Ik_ccNSEZnxyo-4ESqxGmwNON6xE9dAHhprfwT-KSARgEAK7lG-Byttbv0WEwp2"/>
                </div>
                <p className="font-label-sm text-on-surface-variant">
                  Joined by <span className="text-primary font-bold">12k+ active users</span> this month
                </p>
              </div>
            </div>

            <div className="relative animate-fade-in stagger-2">
              <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-3 group">
                <img alt="Healthy Food Bowl" className="rounded-[2rem] w-full h-[550px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYIgoYeyZ0USS-Cckri0epedqHTN6VITA-JPU45BwpHhynmllt5WYmaPyUnKGcoslDq18rhmzE4_-24GvAmVPb7V2CHpbkO-TSyoNao5iCtkdUDafZqZ8bMh1T2FQt-N4pLrPhnAMH3PcQTg4wAl0f0-W-4lJ7wxZrFDGjmbeTblhwj9CfBfJE4ChJJYA-VHZy6ujO9ZawUZZFDh-G5WEG_Cz4FJJ1tGmhinhLe7P_BhI7Mua12Ga3rsAqhW60gJEZ9hWOqlT3GmKH"/>
                <div className="absolute bottom-10 right-10 glass-card p-6 rounded-3xl flex flex-col gap-2 shadow-2xl group-hover:scale-105 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-primary font-bold text-sm">Daily Goal Reached</span>
                  </div>
                  <div className="w-40 h-3 bg-outline-variant/30 rounded-full overflow-hidden mt-1">
                    <div className="vibrant-gradient h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                  <span className="text-on-surface-variant text-xs font-semibold">1,850 / 2,400 kcal</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="glow-accent bg-tertiary-container w-[600px] h-[600px] -bottom-32 left-1/4"></div>
          <div className="max-w-7xl mx-auto px-margin-desktop relative z-10">
            <div className="text-center mb-20">
              <span className="text-tertiary font-extrabold font-label-md tracking-widest uppercase">PRECISION TOOLS</span>
              <h2 className="font-display-lg text-4xl text-on-surface mt-4">Elevate Your Health Experience</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="glass-card p-10 rounded-[2.5rem] group hover:bg-gradient-to-br hover:from-white/90 hover:to-primary/5">
                <div className="w-16 h-16 vibrant-gradient text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                  <span className="material-symbols-outlined text-3xl">restaurant</span>
                </div>
                <h3 className="font-headline-md text-2xl mb-4 group-hover:text-primary transition-colors">AI Diet Planner</h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed mb-8">
                  Our proprietary AI analyzes your metabolic rate to build the perfect weekly menu tailored just for you.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary">verified</span> Macro-balanced meals
                  </li>
                  <li className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary">verified</span> Allergy sensitive
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="glass-card p-10 rounded-[2.5rem] group hover:bg-gradient-to-br hover:from-white/90 hover:to-secondary/5">
                <div className="w-16 h-16 vibrant-gradient-secondary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:-rotate-6 transition-transform">
                  <span className="material-symbols-outlined text-3xl">monitoring</span>
                </div>
                <h3 className="font-headline-md text-2xl mb-4 group-hover:text-secondary transition-colors">BMI Tracking</h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed mb-8">
                  Track your body mass index with precision. Get insights into your health status and weight trends.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary">verified</span> Real-time progress
                  </li>
                  <li className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary">verified</span> Trend analysis
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="glass-card p-10 rounded-[2.5rem] group hover:bg-gradient-to-br hover:from-white/90 hover:to-tertiary/5">
                <div className="w-16 h-16 vibrant-gradient-tertiary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                  <span className="material-symbols-outlined text-3xl">tips_and_updates</span>
                </div>
                <h3 className="font-headline-md text-2xl mb-4 group-hover:text-tertiary transition-colors">Expert Tips</h3>
                <p className="text-on-surface-variant font-body-md leading-relaxed mb-8">
                  Access a library of expert-curated health tips and scientific insights to stay on the right track.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-tertiary">verified</span> Peer-reviewed content
                  </li>
                  <li className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-tertiary">verified</span> Daily notifications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-surface-container-low/50">
          <div className="max-w-7xl mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-display-lg text-4xl text-on-surface">Community Voices</h2>
              <p className="text-on-surface-variant font-body-md mt-4">Real stories from people transforming their lifestyle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-10 rounded-[2rem] border border-outline-variant/30 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-shadow">
                <div className="flex text-secondary-container">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-on-surface-variant italic leading-relaxed">
                  "NutriAI completely changed how I think about food. The meal plans are delicious and actually realistic for my busy schedule."
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img alt="Sarah" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAprd0-N6eoN_saB8ctVgyEW25N1k4RHKAO8IaLyn-VADcxB9v7VUFno7pC8iPMBntXXCsLuO160p0XhgcvM2ty_Rpi3h2qW55iOUxGpl4IaX1ejrbV8Qldgos2FM-7EOtOORvLjyjHB4N44cw7rpOhySTo5ZCSBqUgeCZ-Qg2GvjkOAJ9PRZTeOSs1hNXFZeTJRcs0l2x9n20nUivzGNWG6RYUhQL0PZwqUVGXlciF1SYBbdwVJ43JHcTHacWbyP3oh3TBpxrmF7cc"/>
                  <div>
                    <p className="font-bold text-on-surface">Sarah Jenkins</p>
                    <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tight">Marketing Exec</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-10 rounded-[2rem] border border-outline-variant/30 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-shadow">
                <div className="flex text-secondary-container">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-on-surface-variant italic leading-relaxed">
                  "The BMI tracking and progress charts are incredibly motivating. I've lost 15 lbs in 2 months just by following the AI's advice."
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img alt="David" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATH6qmjr_1o579RlyrxIPZfG-wnaDtdGQynkzeIo8r3xPAyefAUjVqkPA25REiWNkSKS1qEviLjE56k_3MhawZ_GNkxT3F_4jRF2T1e0j9scvEg6gc8MN0tCmrp0iTjpU5U5-1S20Phg3VTnPU_Jk1GzxSLzAyI069wxoY_4xLub2j4JnoNNUnC96ir8OFrXrOun5yVG6obBlahO9ADncHXuW5VUUhXOtDsbWofc94_2Frx3ksNyznE0lARw3_zXWUfdG03ECq94-B"/>
                  <div>
                    <p className="font-bold text-on-surface">David Chen</p>
                    <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tight">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-10 rounded-[2rem] border border-outline-variant/30 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-shadow">
                <div className="flex text-secondary-container">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-on-surface-variant italic leading-relaxed">
                  "Finally, a nutrition app that doesn't feel like a chore. The clinical precision combined with the easy interface is a winner."
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img alt="Elena" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCImMbY2_OtYUFHAdjWS0KopdygSqrcd_DtltXjvpmZlpDFxITFH30OPdmqXYUbVG9ZAyKDfHcfXKtlA9IXzXCi0AQZz0mlNY3RhA02cINp9FDQbyIlJYBOyqFLWHHKlVUv6IgZCrocpFk-5kHT1pU4kCVey2VfIgTDP-86zA248knNVzeIfm5G5HQEZ2Ap9pkVxO9rLnaQYWo-CZMs5QiEpR7OJxbh4hR_Q8oqWfOOaGJjUT3aGDHmDLNF1ImyGqy0wj-altLvuwPK"/>
                  <div>
                    <p className="font-bold text-on-surface">Elena Rodriguez</p>
                    <p className="text-xs text-on-surface-variant uppercase font-bold tracking-tight">Yoga Instructor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-margin-desktop">
            <div className="vibrant-gradient p-16 md:p-24 rounded-[4rem] relative overflow-hidden shadow-2xl text-center">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-10 -mb-10"></div>
              <div className="relative z-10">
                <h2 className="font-display-lg text-4xl md:text-5xl text-white mb-8">Ready to transform?</h2>
                <p className="text-white/80 font-body-md text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of users who are already reaching their health goals with NutriAI. Your perfect plan is just one click away.
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  disabled={loading}
                  className="bg-white text-primary px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Your Diet Plan Now"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant pt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-margin-desktop pb-16 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            <span className="font-display-lg text-2xl font-extrabold text-primary">NutriAI</span>
            <p className="text-on-surface-variant font-body-md leading-relaxed">
              Empowering your health journey with science-backed AI nutrition and clinical precision.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-on-surface-variant hover:text-primary shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-xl">language</span>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-on-surface-variant hover:text-primary shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-xl">mail</span>
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">About Us</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Science</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-widest text-xs">Product</h4>
            <ul className="flex flex-col gap-4">
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Planner</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">BMI Calculator</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Tips Library</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Terms of Service</a></li>
              <li><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-margin-desktop py-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-sm text-on-surface-variant">© 2024 NutriAI. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="text-on-surface-variant font-label-sm">Precision Wellness</span>
            <span className="text-on-surface-variant font-label-sm font-bold">v2.1.0</span>
          </div>
        </div>
      </footer>

      {/* User Details Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-[2.5rem] max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-outline-variant/30 p-8 flex justify-between items-center">
              <div>
                <h3 className="font-display-lg text-3xl text-on-surface">Tell Us About Yourself</h3>
                <p className="text-on-surface-variant font-body-md mt-2">We'll create a personalized plan just for you</p>
              </div>
              <button 
                onClick={() => setShowForm(false)}
                className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all"
              >
                close
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="10"
                    max="100"
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g., 25"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    min="30"
                    max="300"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g., 70"
                  />
                </div>

                {/* Height */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Height (cm) *</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    min="100"
                    max="250"
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g., 170"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Fitness Goal</label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="athletic_performance">Athletic Performance</option>
                    <option value="general_health">General Health</option>
                  </select>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Activity Level</label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="sedentary">Sedentary (Little or no exercise)</option>
                    <option value="light">Light (Exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
                    <option value="active">Active (Exercise 6-7 days/week)</option>
                    <option value="very_active">Very Active (Physical job or 2x training)</option>
                  </select>
                </div>

                {/* Diet Type */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Diet Preference</label>
                  <select
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="non_vegetarian">Non-Vegetarian</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Country/Region</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                    placeholder="e.g., India"
                  />
                </div>

                {/* Meals Per Day */}
                <div>
                  <label className="block text-on-surface font-bold mb-2">Meals Per Day</label>
                  <select
                    name="mealsPerDay"
                    value={formData.mealsPerDay}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="3">3 Meals</option>
                    <option value="4">4 Meals</option>
                    <option value="5">5 Meals</option>
                    <option value="6">6 Meals</option>
                  </select>
                </div>

                {/* Allergies - Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-on-surface font-bold mb-2">Allergies / Restrictions (Optional)</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-outline-variant focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="e.g., Nuts, Lactose intolerant, Gluten-free..."
                  />
                </div>
              </div>
            </form>

            <div className="sticky bottom-0 bg-white border-t border-outline-variant/30 p-8 flex gap-4">
              <button 
                onClick={handleFormSubmit}
                className="vibrant-gradient text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-primary/30 transition-all flex-1"
              >
                Generate My Diet Plan
              </button>
              <button 
                onClick={() => setShowForm(false)}
                className="bg-white border-2 border-outline-variant text-on-surface px-8 py-4 rounded-2xl font-bold hover:bg-surface-container-low transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diet Plan Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-outline-variant/30 p-8 flex justify-between items-center">
              <div>
                <h3 className="font-display-lg text-3xl text-on-surface">Your Personalized Diet Plan</h3>
                <p className="text-on-surface-variant font-body-md mt-2">Generated by AI for optimal health</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all"
              >
                close
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-6">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-on-surface-variant font-body-md">Crafting your perfect meal plan...</p>
                </div>
              ) : dietPlan ? (
                <div className="prose prose-lg max-w-none">
                  <pre className="whitespace-pre-wrap font-body-md text-on-surface bg-surface-container-low p-8 rounded-3xl leading-relaxed">
                    {dietPlan}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">restaurant_menu</span>
                  <p className="text-on-surface-variant font-body-md">Click "Generate Diet Plan" to get started</p>
                </div>
              )}
            </div>

            {dietPlan && !loading && (
              <div className="sticky bottom-0 bg-white border-t border-outline-variant/30 p-8 flex gap-4">
                <button 
                  onClick={generateDietPlan}
                  className="vibrant-gradient text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Regenerate Plan
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(dietPlan);
                    alert('Diet plan copied to clipboard!');
                  }}
                  className="bg-white border-2 border-outline-variant text-on-surface px-8 py-4 rounded-2xl font-bold hover:bg-surface-container-low transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">content_copy</span>
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
