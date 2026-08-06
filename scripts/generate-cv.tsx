import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  renderToFile,
} from "@react-pdf/renderer";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { profile } from "../src/content/profile";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#0B1220",
    lineHeight: 1.45,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    color: "#0F6E6A",
    marginBottom: 8,
  },
  summary: {
    fontSize: 10,
    color: "#4A5568",
    marginBottom: 12,
    maxWidth: 480,
  },
  meta: {
    fontSize: 9,
    color: "#4A5568",
    marginBottom: 20,
  },
  section: {
    marginTop: 14,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#0F6E6A",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#D5DBE3",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  jobPeriod: {
    fontSize: 9,
    color: "#4A5568",
  },
  jobCompany: {
    fontSize: 9,
    color: "#4A5568",
    marginBottom: 4,
  },
  bullet: {
    fontSize: 9,
    color: "#4A5568",
    marginLeft: 8,
    marginBottom: 2,
  },
  stack: {
    fontSize: 8,
    color: "#0F6E6A",
    marginTop: 4,
    marginBottom: 10,
  },
  projectName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9,
    color: "#4A5568",
    marginBottom: 2,
  },
  link: {
    fontSize: 8,
    color: "#0F6E6A",
    textDecoration: "none",
  },
});

function CvDocument() {
  return (
    <Document
      title={`${profile.name} — CV`}
      author={profile.name}
      subject={profile.title}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.title}>
          {profile.title} — {profile.tagline}
        </Text>
        <Text style={styles.summary}>{profile.summary}</Text>
        <Text style={styles.meta}>
          {profile.location} · {profile.social.email} ·{" "}
          {profile.social.website.replace("https://", "")} · github.com/tul1
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stack</Text>
          <Text style={styles.stack}>{profile.stack.join(" · ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {profile.experience.map((job) => (
            <View key={`${job.company}-${job.period}`} wrap={false}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobRole}>
                  {job.role} · {job.company}
                </Text>
                <Text style={styles.jobPeriod}>{job.period}</Text>
              </View>
              <Text style={styles.jobCompany}>{job.location}</Text>
              {job.bullets.map((b) => (
                <Text key={b} style={styles.bullet}>
                  • {b}
                </Text>
              ))}
              <Text style={styles.stack}>{job.stack.join(" · ")}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected work</Text>
          {profile.projects.map((project) => (
            <View key={project.name} style={{ marginBottom: 8 }} wrap={false}>
              <Text style={styles.projectName}>
                {project.name} — {project.role}
              </Text>
              <Text style={styles.projectDesc}>{project.description}</Text>
              <Text style={styles.stack}>{project.stack.join(" · ")}</Text>
              {project.links.github ? (
                <Link src={project.links.github} style={styles.link}>
                  {project.links.github}
                </Link>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Focus</Text>
          {profile.focus.map((item) => (
            <Text key={item.label} style={styles.bullet}>
              • [{item.label}] {item.text}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = join(__dirname, "..", "public", "cv.pdf");
  mkdirSync(dirname(outPath), { recursive: true });
  await renderToFile(<CvDocument />, outPath);
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
