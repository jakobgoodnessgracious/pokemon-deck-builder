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
      <div className="row g-0">
        {/* Left */}
        <div className="col-6 pt-3">
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

        {/* Right */}
        <div className="col-6" style={{ height: '100vh' }}>
          <div className="col-11 offset-1" style={{ height: '100vh' }}>
            <div className="position-relative h-100 w-100">
              <Image
                className="object-fit-cover"
                src="/images/the_pokeball_of_ivysaur_by_wazzy88_d4uhk4w.jpg"
                fill
              />
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
