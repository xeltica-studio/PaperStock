import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { WikiPage } from '../components/WikiPage';

type Prop = {
  title: string;
  body: string;
};

const Container = styled.div`
  background-color: var(--indigo-6);
  background-image: radial-gradient(var(--white-50) 3%, transparent 0);
  background-size: 50px 50px;
  min-height: 100vh;
  position: relative;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Index: NextPage<Prop> = (p) => {
  return (
    <WikiPage {...p} />
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await fetch('http://localhost:3000/api/v1/page').then(d => d.json());
  return {
    props: data,
  };
};

export default Index;
