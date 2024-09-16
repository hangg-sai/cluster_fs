import "@mantine/core/styles.css";
import {
  MantineProvider,
  Checkbox,
  TextInput,
  Flex,
  SimpleGrid,
  Text,
  Image,
} from "@mantine/core";
import "./submodules/html-compare/compare.js";
import "./submodules/html-compare/style.css";

function getDirname(filePath: string): string {
  return filePath.split("/").slice(0, -1).join("/");
}

interface Content {
  path: string;
  type: "file" | "image" | "video";
}

interface GridViewProps {
  contents: Content[];
  maxCols?: number;
}

function GridView({ contents, maxCols = 6 }: GridViewProps) {
  const style: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };
  return (
    <>
      <Flex align="center" gap="md">
        <Text style={{ marginRight: "10px" }}>
          Back to parent <a href="TODO">TODO</a>
        </Text>
        <Checkbox label="Show hidden" labelPosition="left" />
        <Flex align="center">
          <Text style={{ marginRight: "10px" }}>Path regex</Text>
          <TextInput />
        </Flex>
      </Flex>
      <SimpleGrid cols={Math.min(maxCols, contents.length)} spacing="xs">
        {contents.map((content, index) => {
          return (
            <div key={index} style={style}>
              <Checkbox />
              {content.type === "image" && <Image src={content.path} />}
              {content.type === "video" && (
                <video width="100%" controls>
                  <source src={content.path} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <Text>
                <a href={content.path}>{content.path.split("/").pop()}</a>
              </Text>
            </div>
          );
        })}
      </SimpleGrid>
    </>
  );
}

export default function App() {
  const contents: Content[] = [
    { path: "/dev/file.txt", type: "file" },
    { path: "/dev/image.png", type: "image" },
    { path: "/dev/video.mp4", type: "video" },
    { path: "/dev/video.mp4", type: "video" },
    { path: "/dev/video.mp4", type: "video" },
    { path: "/dev/video.mp4", type: "video" },
    { path: "/dev/video.mp4", type: "video" },
    { path: "/dev/video.mp4", type: "video" },
    { path: "/dev/video.mp4", type: "video" },
    { path: "/dev/video.mp4", type: "video" },
  ];
  return (
    <MantineProvider>
      <h1>{getDirname(contents[0].path)}</h1>
      <hr />
      <div className="compare">
        <img
          className="compared compared-left"
          data-compare="standard"
          src="/dev/image.png"
        />
        <img
          className="compared compared-right"
          data-compare="ours"
          src="/dev/image.png"
        />
      </div>
      <hr />
      <GridView contents={contents} />
    </MantineProvider>
  );
}
