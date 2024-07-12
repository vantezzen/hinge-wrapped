"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const items = [
  {
    question: "How can I get my Hinge data?",
    answer: (
      <>
        You can request your Hinge data export in the Hinge app. To do this,
        open your profile tab in the bottom right corner, click on settings, and
        then click on "Download My Data" at the bottom of the page.
        <br />
        You'll need to wait while Hinge prepares your data. You'll get an email
        and notification when it's ready!
        <br />
        Once it's done, you can go to that same settings page and download your
        data export as a ZIP file.
      </>
    ),
  },
  {
    question: "Which file should I use for Wrapped for Hinge?",
    answer: (
      <>
        After downloading your Hinge data export, you can choose the ZIP file
        you downloaded (it should be called "Hinge Data Export - Your
        Name.zip").
      </>
    ),
  },
  {
    question: "Is this safe? Is Wrapped for Hinge legit?",
    answer: (
      <>
        Wrapped for Hinge is safe and privacy-centered. If you know how to read
        code, you can look at Wrapped for Hinge's full source code at{" "}
        <a
          href="https://github.com/vantezzen/hinge-wrapped"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://github.com/vantezzen/hinge-wrapped
        </a>
        . Your Hinge data is only used in your browser and never uploaded to any
        server. We will not store or process your data on our server in any way.
      </>
    ),
  },
  {
    question: "What is this website for?",
    answer: (
      <>
        I always like Spotify Wrapped and wanted to have something similar for
        Hinge. So I built Wrapped for Hinge, a website that generates a
        personalized summary of your Hinge usage based on your Hinge data
        export.
      </>
    ),
  },
  {
    question: "Can you get access to my Hinge account with my data?",
    answer: (
      <>
        The short answer is <strong>no</strong>. Your Hinge data export only
        contains data about your account, not your login credentials!
        <br />
        You can <strong>verify this yourself</strong> by opening your Hinge data
        export and looking at the files inside in a text editor. You can try
        searching for your Hinge password in the file and you'll see that it's
        not there.
        <br />
        In general, Hinge doesn't store your unencrypted password anywhere and
        only stores a hashed version of it. Due to this, it's impossible for the
        Hinge data export to contain your password.
        <br />
        Wrapped for Hinge will never ask you for your Hinge login credentials
        and doesn't require you to enter them anywhere.
        <br />
        <br />
        Depending on your Hinge account data, your data export may contain your
        email address or phone number. This data is{" "}
        <strong>not used or transferred</strong> by Wrapped for Hinge!
        <br />
        However, if you are concerned about this, you can open your export data
        in a text editor, search for your email address or phone number and
        delete it from the file before uploading it to Wrapped for Hinge.
      </>
    ),
  },
  {
    question: "Does my Wrapped contain my full Hinge history?",
    answer: (
      <>
        Your export should contain your full Hinge history. However, if you have
        used the "Fresh Start" feature in Hinge, your data export may not
        contain data from before the "Fresh Start".
      </>
    ),
  },
  {
    question:
      "How long do I have to wait for my Hinge data? Why isn't this faster?",
    answer: (
      <>
        Hinge needs to prepare your data export after you request it. This
        process can take anywhere from a few minutes to a few days, depending on
        how much data you have on Hinge.
        <br />
        Unfortunately, there is currently no other method for Wrapped for Hinge
        to access your Hinge data faster.
      </>
    ),
  },
  {
    question: "How does Wrapped for Hinge work?",
    answer: (
      <>
        Wrapped for Hinge uses your Hinge data export to calculate your Wrapped.
        This means that all statistics are generated locally in your browser and
        your data is never uploaded to any server.
      </>
    ),
  },
];

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg dark mx-auto text-left"
    >
      {items.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Faq;
