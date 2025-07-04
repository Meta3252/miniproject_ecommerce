export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-[#011F4B] text-white flex flex-col justify-center items-center text-center px-6"
        style={{
          minHeight: "70vh",
          backgroundImage: "url('/images/banner_about.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#011F4B] opacity-75"></div>

        <div className="relative max-w-4xl z-10">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-md">
            About Us
          </h1>
          <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed drop-shadow-md">
            We are a leading computer equipment sales representative with more than 523 branches nationwide.
          </p>
          <a
            href="#about"
            className="inline-block bg-[#85A9DF] hover:bg-[#6e96d0] text-[#011F4B] font-semibold px-8 py-3 rounded-md transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-16">
        {/* Container ครอบไว้ */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* รูปด้านซ้าย */}
            <div className="flex justify-center">
              <img
                src="/images/banner_about_2.jpg"
                alt="Why choose us"
                className="rounded-lg shadow-md object-cover w-auto h-[500px]"
              />

            </div>

            {/* ข้อความด้านขวา */}
            <div className="self-start p-5">
              <h3 className="text-3xl font-bold text-[#011F4B] mb-5">
                Why Choose Us?
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                We provide tailored solutions to meet your business needs. Our team is
                driven by innovation and dedicated to excellence.
              </p>
              <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
                <li>We are the cheapest computer product seller.</li>
                <li>Premium quality products delivered to your doorstep</li>
                <li>Lifetime guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
