"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Line from '../../components/Line';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function Home() {

  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('Avatar');
  const router = useRouter();
  const handleLogout = async () => {
   
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(accessToken, refreshToken)
        const response = await fetch("http://localhost:5217/api/v1/advocate/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({ refreshToken }),
          credentials: 'include' // include credentials to send cookies
        });

        if (response.ok) {
          // Clear tokens from localStorage
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          // Redirect to login page or any other page
          setMessage("Successfully logged out!");
          // Clear message after 2 seconds
          setTimeout(() => {
            setMessage('');
          }, 2000);
          router.push('/');

        } else {
          throw new Error("Failed to logout");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  useEffect(() => {
    // if (router.isReady) {
      const avatar = searchParams.get("avatar");

      // const { query } = router;
      // const clientName = query.clientName;
      if (avatar) {
        setAvatar(avatar);
      }
    // }
  }, []);


  return (
    <div>
<nav className='bg-[#00091d] text-gray-300 flex items-center justify-between h-16'>
<Link href="/">
        <div className="logo size-12 ml-4 flex items-center cursor-pointer">
          <img className='' src="../JUDICIALJURYLOGO.png" alt="JuryJunction" />
        </div>
        </Link>
      <ul className='flex gap-8 items-center mr-4'>
        <li className="cursor-pointer">
          <Link href="/resolveQueries">
            <div>Queries</div>
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link href="/postBlogs">
            <div>Post Blogs</div>
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link href="/checkApplication">
            <div>Applications</div>
          </Link>
        </li>
      </ul>
      <div className="cursor-pointer rounded-full bg-white p-1" onClick={handleLogout}>
  <img
    src={avatar}
    alt=""
    className="rounded-full w-12 h-12 object-cover"
  />
   {message && <p>{message}</p>}
</div>
    </nav>
<Line/>

      <div className="p-10">
        <h1 className="text-white font-bold text-5xl text-center pt-20">JuryJunction</h1>
        <p className="text-gray-300 text-center pt-2">
          Where Advocacy Meets Need: Connecting You with the Right Legal Expertise
        </p>

        <section className="pt-10">
          <h1 className="text-white font-bold text-xl text-center pb-5">Meet some of our top Advocates</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Sample Advocate Cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-blue-900 text-white rounded-md p-4 flex flex-col gap-2">
                <img
                  className="rounded-full w-20 h-20 mx-auto"
                  src="https://img.freepik.com/free-photo/medium-shot-man-working-as-lawyer_23-2151054001.jpg"
                  alt="Lawyer"
                />
                <h2 className="text-sm text-center">Sanjeev Tripathi</h2>
                <p className="text-xs text-center">New Delhi</p>
                <p className="text-xs text-center">Criminal Lawyer</p>
                <button className="btn-primary mx-auto">More</button>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-20 pb-20">
          <h2 className="text-white text-3xl font-bold text-center pb-5">About Us</h2>
          <p className="text-white text-center">
            Gone are the days of endless searches and uncertainty. With JurisJunction, users can simply create
            Link profile outlining their legal requirements and preferences. Whether you're seeking advice for
            Link personal injury claim, drafting Link will, or navigating Link complex business dispute, our
            platform will match you with the ideal lawyer who specializes in your specific area of concern.
          </p>
          <p className="text-white text-center pt-4">
            Our extensive network of qualified attorneys ensures that you'll find the perfect legal
            representation tailored to your individual needs. From experienced litigators to skilled
            negotiators, JurisJunction connects you with the right lawyer to champion your case and protect
            your rights.
          </p>
          <p className="text-white text-center pt-4">
            Say goodbye to legal stress and confusion. Join JurisJunction today and take the first step
            towards resolving your legal matters with confidence and peace of mind. Your journey to justice
            starts here, at JurisJunction where law meets convenience.
          </p>
        </section>

        <section>
          <h2 className="text-white text-3xl font-bold text-center pb-5">Why choose us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="bg-blue-900 rounded-lg p-4">
              <h3 className="font-bold text-xl">Experienced</h3>
              <p>
                A team of lawyers with extensive experience and Link proven track record of success. So,
                "Looking for legal expertise? Our website connects you with experienced lawyers ready to
                assist. Get the guidance you need, hassle-free!"
              </p>
            </div>
            <div className="bg-blue-900 rounded-lg p-4">
              <h3 className="font-bold text-xl">Approachable</h3>
              <p>
                A focus on results, with Link no-nonsense approach to getting clients the best possible
                outcome. "Navigate legal matters with ease! Our approachable website makes connecting with
                experienced lawyers Link seamless experience. Your legal solutions are just Link click away."
              </p>
            </div>
            <div className="bg-blue-900 rounded-lg p-4">
              <h3 className="font-bold text-xl">Affordable</h3>
              <p>
                Affordable and flexible fee structures, including contingency and flat-fee arrangements.
                "Seeking quality legal advice without breaking the bank? Our website offers affordable
                access to experienced lawyers, making legal assistance accessible to everyone. Explore our
                budget-friendly options today!"
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
