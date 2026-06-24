import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

/** @type {{ input: string; output: string; width: number; quality?: number }[]} */
const jobs = [
    { input: "public/img10.jpg", output: "public/img10.webp", width: 1200, quality: 82 },
    { input: "public/bg.png", output: "public/bg.webp", width: 1920, quality: 85 },
    { input: "public/BuildTrust.jpg", output: "public/BuildTrust.webp", width: 1400, quality: 82 },
    { input: "public/DataInsights.jpg", output: "public/DataInsights.webp", width: 1400, quality: 82 },
    { input: "public/LetBond.jpg", output: "public/LetBond.webp", width: 1400, quality: 82 },
    { input: "public/StoriesConvert.jpg", output: "public/StoriesConvert.webp", width: 1400, quality: 82 },
    ...[
        "PublicRelations",
        "BrandConsultancy",
        "ReputationManagement",
        "WebsiteDevelopment",
        "DigitalMarketing",
        "InvestorRelations",
    ].map((name) => ({
        input: `public/services/${name}.png`,
        output: `public/services/${name}.webp`,
        width: 900,
        quality: 85,
    })),
];

function fmt(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

for (const job of jobs) {
    const inputPath = path.join(root, job.input);
    const outputPath = path.join(root, job.output);

    if (!fs.existsSync(inputPath)) {
        console.warn(`skip (missing): ${job.input}`);
        continue;
    }

    const before = fs.statSync(inputPath).size;

    await sharp(inputPath)
        .rotate()
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: job.quality ?? 82, effort: 4 })
        .toFile(outputPath);

    const after = fs.statSync(outputPath).size;
    console.log(`${job.input} → ${job.output}: ${fmt(before)} → ${fmt(after)}`);
}
