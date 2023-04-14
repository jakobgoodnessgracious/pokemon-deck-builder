import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import useSWR from 'swr';
import Image from 'next/image';
import Nav from '../components/Nav/Nav';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR('/api/card', fetcher);

  // if (error) return <div>failed to load</div>
  // if (isLoading) return <div>loading...</div>
  return (
    // <Layout home>
    //   {/* Keep the existing code here */}

    //   {/* Add this <section> tag below the existing <section> tag */}
    //   <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    //     <h2 className={utilStyles.headingLg}>Blog</h2>
    //     <ul className={utilStyles.list}>
    //       {allPostsData.map(({ id, date, title }) => (
    //         <li className={utilStyles.listItem} key={id}>
    //           <Link href={`/posts/${id}`}>{title}</Link>
    //           <br />
    //           <small className={utilStyles.lightText}>
    //             <Date dateString={date} />
    //           </small>
    //         </li>
    //       ))}
    //     </ul>
    //   </section>
    // </Layout>
    // <Layout home>
    //   {error && <div>failed to load</div>}
    //   {isLoading && <div>loading...</div>}
    //   {!error && !isLoading &&
    //     // <div style={{ display: 'flex' }}> {data.map(({ image_small_url, id }) => {
    //     //   return <Image
    //     //     key={id}
    //     //     priority
    //     //     src={image_small_url}
    //     //     className={utilStyles.cardBorderRadius}
    //     //     // height={171} // original
    //     //     // width={122.5} // original
    //     //     height={205.2} // 40 %
    //     //     width={147} // 40 %
    //     //     // height={239.4} // 30%
    //     //     // width={171.5} // 30%
    //     //     placeholder="blur"
    //     //     blurDataURL={image_small_url}
    //     //     alt=""
    //     //   />
    //     // })}
    //     // </div>
    //       <div>fucksake</div>
    //   }

    // </Layout >
    <div id="app" style={{ height: '100vh', width: '100vw' }}>
      <div className="row g-0 h-100">
        {/* Left */}
        <div className="col-6 h-100 pt-3">
          {/* Nav */}
          <div className="row h-10">
            <div className="col-7 offset-1 fs-4">
              <Nav
                tabs={[
                  { label: 'Home' },
                  { label: 'Collection' },
                  { label: 'Decks' },
                  { label: 'Stats' },
                  { label: 'Api' },
                ]}
              />
            </div>
          </div>
          {/* Body */}
          <div className="row h-90">
            <div className="row align-items-center h-90">
              <div className="d-flex justify-content-center">
                <div
                  style={{
                    height: '333px',
                    width: '30px',
                    backgroundColor: '#433D3B',
                  }}
                ></div>
                <div
                  style={{
                    height: '333px',
                    width: '310px',
                    backgroundColor: '#97908A',
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                  }}
                >
                  <div className="d-flex h-10 justify-content-between">
                    <div className="ms-3 mt-1">
                      <Image
                        src="/images/next_arrow.svg"
                        width={22}
                        height={19}
                      />
                    </div>
                    <div className="ms-3 mt-1 me-4">
                      <Image src="/images/deco_tr.svg" width={22} height={19} />
                    </div>
                  </div>
                  <div className="d-flex h-75 justify-content-between">
                    <div className="ms-3 mt-1">
                      <Image
                        src="/images/next_arrow.svg"
                        width={22}
                        height={19}
                      />
                    </div>
                    <div className="ms-3 mt-1 me-4">
                      <Image src="/images/deco_tr.svg" width={22} height={19} />
                    </div>
                  </div>
                  <div className="d-flex h-15 justify-content-between align-items-center">
                    <div
                      className="ms-3 fs-4 mt-1"
                      style={{ color: '#433D3B' }}
                    >
                      Manage Collection
                    </div>
                    <div className="mt-2 me-3">
                      <Image src="/images/deco_br.svg" width={22} height={19} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row h-10">
              <div className="offset-1 col">
                <Image src="/images/deco_bl.svg" width={69} height={56} />
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-6" style={{ height: '100vh' }}>
          <div className="row g-0">
            <div class="d-none d-xl-block col-1 pt-3 z-1">
              <Image
                src="/images/samich.svg"
                className="cursor-pointer"
                width={56}
                height={25}
              />
            </div>
            <div
              className="offset-sm-1 offset-xl-0 col-11"
              style={{ height: '100vh' }}
            >
              <div className="position-relative h-100 w-100">
                <Image
                  className="object-fit-cover"
                  src="/images/the_pokeball_of_ivysaur_by_wazzy88_d4uhk4w.jpg"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        {error && <div>failed to load</div>}
        {isLoading && <div>loading...</div>}
        {!error && !isLoading && (
          // <div style={{ display: 'flex' }}> {data.map(({ image_small_url, id }) => {
          //   return <Image
          //     key={id}
          //     priority
          //     src={image_small_url}
          //     className={utilStyles.cardBorderRadius}
          //     // height={171} // original
          //     // width={122.5} // original
          //     height={205.2} // 40 %
          //     width={147} // 40 %
          //     // height={239.4} // 30%
          //     // width={171.5} // 30%
          //     placeholder="blur"
          //     blurDataURL={image_small_url}
          //     alt=""
          //   />
          // })}
          // </div>
          <div></div>
        )}
      </div>
    </div>
  );
}
