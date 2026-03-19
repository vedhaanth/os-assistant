import { Leaf, Heart, ShieldCheck, Utensils, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-sage-gradient py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'svg\'%3E%3Cpath d=\'M30 0l10 20 20 10-20 10-10 20-10-20-20-10 20-10z\' fill=\'%23344C3D\'/%3E%3C/svg%3E")' }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Our Story</h1>
          <p className="text-xl text-sage-evergreen/80 max-w-2xl mx-auto font-medium leading-relaxed">
            From a mother's kitchen to your table. Discover the heritage and heart behind every jar.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-sage-mint/50 text-sage-evergreen rounded-full text-xs font-bold uppercase tracking-widest mb-6">Established 2024</span>
            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight uppercase tracking-tighter">Pure. Natural. <br />Handmade with Care.</h2>
            <div className="space-y-6 text-lg text-sage-moss font-medium leading-relaxed">
              <p>
                Jaggy started with a simple vision: to bring the ancient healing wisdom of Ayurveda into modern homes. What began as a personal journey to discover authentic Rasayanas for our family grew into a mission to share these potent Ayurvedic treasures with everyone.
              </p>
              <p>
                Our recipes are rooted in tradition, passed down through generations of mothers who understood that slow, artisanal methods preserve the true soul of the food. Every product we offer is a celebration of that heritage.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1596502213702-86311cebc91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              className="rounded-3xl shadow-2xl" 
              alt="Traditional Spices" 
            />
            <div className="absolute -bottom-8 -left-8 bg-sage-evergreen p-8 rounded-2xl shadow-2xl text-white">
              <p className="text-4xl font-black mb-1 leading-none">100%</p>
              <p className="text-sm font-bold uppercase tracking-widest text-sage-mint">Preservative Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Chief Mama */}
      <div className="bg-sage-hint/10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Meet Our Chief Mama</h2>
            <p className="text-sage-moss font-bold uppercase tracking-widest">The Heart of our Kitchen</p>
          </div>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                className="rounded-3xl shadow-xl border-4 border-white transform rotate-1" 
                alt="Chief Mama" 
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h3 className="text-3xl font-black text-sage-evergreen">Mrs. Mamta G.</h3>
              <p className="text-xl text-sage-moss font-medium leading-relaxed italic">
                "For me, cooking is an act of love. I treat every product that leaves our kitchen as if I were serving it to my own children."
              </p>
              <div className="space-y-4 text-sage-moss/80 font-medium">
                <p>
                  As our Guiding Wisdom, Mamta ensures that every formula stays true to the classical Ayurvedic texts. Her deep knowledge of herb extraction—from the precise harvesting time of Amla to the long-duration infusions of our oils—is what defines Jaggy's purity and efficacy.
                </p>
                <div className="flex gap-6 mt-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
                      <Heart className="h-6 w-6 text-red-500" />
                    </div>
                    <span className="text-[10px] font-bold uppercase">Passion</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
                      <ShieldCheck className="h-6 w-6 text-sage-evergreen" />
                    </div>
                    <span className="text-[10px] font-bold uppercase">Quality</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
                      <Utensils className="h-6 w-6 text-amber-600" />
                    </div>
                    <span className="text-[10px] font-bold uppercase">Heritage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="premium-card p-10 text-center">
            <div className="w-16 h-16 bg-sage-mint/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-8 w-8 text-sage-evergreen" />
            </div>
            <h4 className="text-xl font-black mb-3 uppercase tracking-widest text-gray-900">Uncompromising Purity</h4>
            <p className="text-sage-moss font-medium">No additives, no shortcuts. Just nature's goodness in its rawest, most powerful form.</p>
          </div>
          <div className="premium-card p-10 text-center">
            <div className="w-16 h-16 bg-sage-mint/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-sage-evergreen" />
            </div>
            <h4 className="text-xl font-black mb-3 uppercase tracking-widest text-gray-900">Ethical Sourcing</h4>
            <p className="text-sage-moss font-medium">We work directly with small farmers, ensuring fair pay and sustainable practices at every step.</p>
          </div>
          <div className="premium-card p-10 text-center">
            <div className="w-16 h-16 bg-sage-mint/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-sage-evergreen" />
            </div>
            <h4 className="text-xl font-black mb-3 uppercase tracking-widest text-gray-900">Community First</h4>
            <p className="text-sage-moss font-medium">A portion of every sale goes back into supporting rural education and local craftsmanship.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
