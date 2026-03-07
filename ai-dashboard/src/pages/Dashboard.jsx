import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const neuralNodes = [
    { x: 10, y: 20 },
    { x: 25, y: 60 },
    { x: 45, y: 30 },
    { x: 60, y: 70 },
    { x: 75, y: 40 },
    { x: 85, y: 80 },
    { x: 35, y: 85 },
    { x: 55, y: 10 },
  ];

  const categories = [
    {
      name: "Conversational",
      tools: [
        { name: "ChatGPT", url: "https://chat.openai.com" },
        { name: "Claude", url: "https://claude.ai" },
        { name: "Gemini", url: "https://gemini.google.com" },
        { name: "Copilot", url: "https://copilot.microsoft.com" },
      ],
    },
    {
      name: "Coding",
      tools: [
        { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
        { name: "Cursor", url: "https://cursor.sh" },
        { name: "Codeium", url: "https://codeium.com" },
        { name: "Replit", url: "https://replit.com" },
      ],
    },
    {
      name: "Image",
      tools: [
        { name: "Midjourney", url: "https://midjourney.com" },
        { name: "DALL·E", url: "https://openai.com/dall-e" },
        { name: "Leonardo", url: "https://leonardo.ai" },
        { name: "Firefly", url: "https://firefly.adobe.com" },
      ],
    },
    {
      name: "Video",
      tools: [
        { name: "Runway", url: "https://runwayml.com" },
        { name: "Pika", url: "https://pika.art" },
        { name: "Synthesia", url: "https://synthesia.io" },
        { name: "HeyGen", url: "https://heygen.com" },
      ],
    },
    {
      name: "Writing",
      tools: [
        { name: "Notion AI", url: "https://notion.so" },
        { name: "Grammarly", url: "https://grammarly.com" },
        { name: "Jasper", url: "https://jasper.ai" },
        { name: "Copy.ai", url: "https://copy.ai" },
      ],
    },
    {
      name: "Business",
      tools: [
        { name: "Zapier AI", url: "https://zapier.com" },
        { name: "HubSpot AI", url: "https://hubspot.com" },
        { name: "Salesforce Einstein", url: "https://salesforce.com" },
        { name: "Airtable AI", url: "https://airtable.com" },
      ],
    },
  ];

  const models = {
    OpenAI: {
      url: "https://openai.com",
      models: [
        { name: "GPT-4o", url: "https://openai.com/pricing" },
        { name: "GPT-4.1", url: "https://openai.com/pricing" },
        { name: "GPT-4 Turbo", url: "https://openai.com/pricing" },
        { name: "DALL·E 3", url: "https://openai.com/dall-e" },
      ],
    },
    Google: {
      url: "https://ai.google",
      models: [
        { name: "Gemini 1.5 Pro", url: "https://one.google.com" },
        { name: "Gemini Flash", url: "https://one.google.com" },
        { name: "Gemini Ultra", url: "https://one.google.com" },
      ],
    },
    Anthropic: {
      url: "https://anthropic.com",
      models: [
        { name: "Claude Opus", url: "https://claude.ai/upgrade" },
        { name: "Claude Sonnet", url: "https://claude.ai/upgrade" },
        { name: "Claude Haiku", url: "https://claude.ai/upgrade" },
      ],
    },
    Meta: {
      url: "https://ai.meta.com",
      models: [
        { name: "LLaMA 3", url: "https://ai.meta.com/llama" },
        { name: "Code LLaMA", url: "https://ai.meta.com/llama" },
      ],
    },
    Mistral: {
      url: "https://mistral.ai",
      models: [
        { name: "Mistral Large", url: "https://mistral.ai" },
        { name: "Mixtral", url: "https://mistral.ai" },
        { name: "Codestral", url: "https://mistral.ai" },
      ],
    },
    Cohere: {
      url: "https://cohere.com",
      models: [
        { name: "Command R", url: "https://cohere.com/pricing" },
        { name: "Command R+", url: "https://cohere.com/pricing" },
      ],
    },
  };

  return (
    <div ref={containerRef} className="relative text-white overflow-hidden">

      {/* AI Neural Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full">

          {neuralNodes.map((node, i) => (
            <motion.circle
              key={i}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="#3b82f6"
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.8, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          {neuralNodes.map((node, i) =>
            neuralNodes.slice(i + 1).map((target, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="#3b82f6"
                strokeWidth="0.5"
                strokeDasharray="4 6"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: (i + j) * 0.2,
                }}
              />
            ))
          )}

        </svg>
      </div>

      {/* HERO */}
      <motion.section
        style={{ scale: scaleHero, opacity: opacityHero }}
        className="h-screen flex flex-col items-center justify-center"
      >
        <h1 className="text-6xl font-bold">
          Welcome back, {user?.name || "Operator"} 👋
        </h1>
        <p className="mt-4 opacity-60 text-xl">
          AI Neural Universe Online
        </p>
      </motion.section>

      {/* CATEGORY NETWORK */}
      <section className="min-h-screen flex flex-wrap justify-center items-center gap-x-40 gap-y-40 px-10 py-32">

        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-[420px] h-[420px]"
          >

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">

              {[{ x:150,y:30 },{ x:30,y:150 },{ x:270,y:150 },{ x:150,y:270 }].map((pos,i)=>(
                <g key={i}>

                  <motion.line
                    x1="150"
                    y1="160"
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#3b82f6"
                    strokeWidth="1.4"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: i * 0.2 }}
                  />

                  <motion.circle
                    r="3"
                    fill="#60a5fa"
                    initial={{ cx:150, cy:160 }}
                    animate={{ cx:[150,pos.x], cy:[160,pos.y] }}
                    transition={{
                      duration:2,
                      repeat:Infinity,
                      delay:i*0.5,
                      ease:"linear"
                    }}
                  />

                </g>
              ))}

            </svg>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

              <motion.div
                animate={{
                  boxShadow:[
                    "0 0 10px rgba(59,130,246,0.4)",
                    "0 0 30px rgba(59,130,246,0.8)",
                    "0 0 10px rgba(59,130,246,0.4)"
                  ]
                }}
                transition={{ duration:2, repeat:Infinity }}
                className="px-6 py-3 text-sm uppercase tracking-widest 
                bg-black/70 border border-blue-400/40 
                rounded-lg backdrop-blur-md"
              >
                {cat.name}
              </motion.div>

            </div>

            {cat.tools.map((tool,i)=>{

              const positions=[
                "-top-10 left-1/2 -translate-x-1/2",
                "-left-10 top-1/2 -translate-y-1/2",
                "-right-10 top-1/2 -translate-y-1/2",
                "-bottom-10 left-1/2 -translate-x-1/2",
              ];

              return(
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute ${positions[i]}
                  px-4 py-2 text-sm rounded-md
                  bg-white/10 border border-white/20
                  backdrop-blur-md
                  hover:bg-blue-500/20 hover:border-blue-400
                  transition`}
                >
                  {tool.name}
                </a>
              )

            })}

          </motion.div>
        ))}

      </section>

      {/* FOUNDATION MODELS */}
      <section className="min-h-screen flex flex-col items-center justify-center px-10">

        <h2 className="text-6xl font-bold mb-24">
          Foundation Models
        </h2>

        <div className="space-y-20 text-center w-full max-w-6xl">

          {Object.entries(models).map(([provider, data], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >

              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-semibold tracking-widest opacity-70 hover:opacity-100 block mb-10"
              >
                {provider}
              </a>

              <div className="flex flex-wrap justify-center gap-8">

                {data.models.map((model, i) => (
                  <a
                    key={i}
                    href={model.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 text-lg rounded-full
                    bg-white/5 border border-white/20
                    hover:border-blue-400
                    backdrop-blur-md
                    transition-all duration-300"
                  >
                    {model.name}
                  </a>
                ))}

              </div>

            </motion.div>
          ))}

        </div>
      </section>

    </div>
  );
}