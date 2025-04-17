import Image from 'next/image'
import React from 'react'
import profileCharacter from "../../../public/character.png"

const AboutCoverSection = () => {
  return (
    <section className='w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light'>
        <div className='w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center'> 
            <Image src={profileCharacter} alt="CodeBucks" 
            className='w-4/5  xs:w-3/4 md:w-full h-full object-contain object-center'
            priority
            sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
            />
        </div>

        <div className='w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16'>
            <h2 className='font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left'>
            Dream Big, Work Hard, Achieve More!
            </h2>
            <p className='font-medium capitalize mt-4 text-base'>
            At Evgyaan, we’re passionate about driving the future of mobility—literally. Started as a YouTube channel to demystify the electric vehicle revolution in India, Evgyaan has grown into one of the most trusted voices in the EV space. With over 270K+ subscribers and 66 million+ views, we are on a mission to educate, inform, and empower individuals to make smarter, greener choices.

From detailed EV reviews and comparisons to breaking news, in-depth tech explainers, and policy updates—Evgyaan is your one-stop destination for everything electric. Whether you're a curious first-time EV buyer or a hardcore tech enthusiast, we’ve got content tailored for you.

We believe that the transition to electric mobility isn’t just about vehicles—it’s about building a cleaner, smarter future for everyone. Join us on this journey as we simplify EV knowledge, one video (and now one webpage) at a time.
            </p>
        </div>
    </section>
  )
}

export default AboutCoverSection