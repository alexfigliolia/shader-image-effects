"use client";
import { Fragment, useCallback, useState } from "react";
import { DisappearingImage } from "Components/DisappearingImage";
import { GLWaveImage } from "Components/GLWaveImage";
import { WebGLImages } from "Components/WebGLImages";
import { Propless } from "Types/React";
import "./styles.scss";

export default function Home(_: Propless) {
  const [hideImages, setHideImages] = useState(false);

  const onReady = useCallback(() => {
    setHideImages(true);
  }, []);

  return (
    <Fragment>
      <WebGLImages
        parent="main"
        onReady={onReady}
        target="#translationTarget"
        ImageComponent={GLWaveImage}
      />
      <main>
        <div id="translationTarget">
          <div className="banner">
            <figure>
              <DisappearingImage
                hidden={hideImages}
                src="/image-1.jpg"
                alt=""
              />
              <figcaption>
                <h2>A title for this image</h2>
                <p>
                  A description for this image about things. A description for
                  this image about things. A description for this image about
                  things. A description for this image about things. A
                  description for this image about things.
                </p>
                <time dateTime="2025-05-30T20:16:36.204Z">May 30, 2025</time>
              </figcaption>
            </figure>
          </div>
          <div className="content">
            <figure>
              <DisappearingImage
                hidden={hideImages}
                src="/image-2.jpg"
                alt=""
              />
              <figcaption>
                <h2>A title for this image</h2>
                <p>
                  A description for this image about things. A description for
                  this image about things. A description for this image about
                  things. A description for this image about things. A
                  description for this image about things.
                </p>
                <time dateTime="2025-05-30T20:16:36.204Z">May 30, 2025</time>
              </figcaption>
            </figure>
            <figure>
              <DisappearingImage
                hidden={hideImages}
                src="/image-3.jpg"
                alt=""
              />
              <figcaption>
                <h2>A title for this image</h2>
                <p>
                  A description for this image about things. A description for
                  this image about things. A description for this image about
                  things. A description for this image about things. A
                  description for this image about things.
                </p>
                <time dateTime="2025-05-30T20:16:36.204Z">May 30, 2025</time>
              </figcaption>
            </figure>
            <figure>
              <DisappearingImage
                hidden={hideImages}
                src="/image-4.jpg"
                alt=""
              />
              <figcaption>
                <h2>A title for this image</h2>
                <p>
                  A description for this image about things. A description for
                  this image about things. A description for this image about
                  things. A description for this image about things. A
                  description for this image about things.
                </p>
                <time dateTime="2025-05-30T20:16:36.204Z">May 30, 2025</time>
              </figcaption>
            </figure>
            <figure>
              <DisappearingImage
                hidden={hideImages}
                src="/image-5.jpg"
                alt=""
              />
              <figcaption>
                <h2>A title for this image</h2>
                <p>
                  A description for this image about things. A description for
                  this image about things. A description for this image about
                  things. A description for this image about things. A
                  description for this image about things.
                </p>
                <time dateTime="2025-05-30T20:16:36.204Z">May 30, 2025</time>
              </figcaption>
            </figure>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
