import { FC, useEffect, useState } from 'react';
import { RiGitCommitLine, RiGithubFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'redaxios';
import { Button } from '@/components/Button';
import { CityCardBox } from '@/components/Landing/CityCardBox';
import { Logo } from '@/components/Logo';

const GITHUB_COMMIT_API = 'https://api.github.com/repos/SkyLightQP/marble/commits?sha=release';

interface GithubApiType {
  sha: string;
  commit: {
    message: string;
  };
  html_url: string;
}

export const LandingPage: FC = () => {
  const [commits, setCommits] = useState<GithubApiType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<GithubApiType[]>(GITHUB_COMMIT_API).then((res) => {
      const filteredCommits = res.data.filter((commit) => {
        if (commit.commit.message.includes('Merge pull request')) return false;
        if (commit.commit.message.includes('(deps):')) return false;
        return true;
      });
      setCommits(filteredCommits);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gray-50 text-stone-950">
      <div className="container mx-auto px-6 lg:px-0">
        <header className="py-5 flex justify-between">
          <Logo className="text-2xl" />
          <Button className="px-4 py-1.5 rounded-xl hidden lg:block" onClick={() => navigate('/rooms')}>
            게임시작
          </Button>
        </header>

        <main>
          <section className="flex justify-between mt-6 flex-col lg:flex-row">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold leading-10 lg:text-5xl lg:leading-[1.1]">
                웹으로 즐기는
                <br />
                도시경영 주사위
                <br />
                보드게임.
              </h1>
              <div className="mt-4">
                <p className="text-lg font-bold">시간과 장소를 가리지 않고 친구와 보드게임을 해보세요.</p>
                <p className="text-sm text-gray-500">
                  * 모바일 환경은 지원하지 않습니다. 데스크톱, 태블릿을 이용해주세요.
                </p>
              </div>
              <div className="mt-6">
                <Button
                  className="px-5 py-1.5 rounded-xl text-lg  bg-gray-300 hover:bg-gray-400 lg:bg-blue-600 lg:hover:bg-blue-700"
                  onClick={() => navigate('/rooms')}
                >
                  게임시작
                </Button>
              </div>
            </div>

            <div className="flex-col items-end hidden lg:flex">
              <div className="grid grid-cols-3 gap-2 mb-3 justify-end">
                <CityCardBox color="blue">
                  <p className="text-2xl font-bold">서울</p>
                  <p>SEOUL</p>
                </CityCardBox>
                <CityCardBox color="green">
                  <p className="text-2xl font-bold">원주</p>
                  <p>WONJU</p>
                </CityCardBox>
                <CityCardBox color="red">
                  <p className="text-2xl font-bold">전주</p>
                  <p>JEONJU</p>
                </CityCardBox>
              </div>
              <div className="grid grid-cols-4 gap-2 justify-end">
                <CityCardBox color="red">
                  <span role="img" aria-label="dice" className="text-7xl">
                    🎲
                  </span>
                </CityCardBox>
                <CityCardBox color="yellow">
                  <p className="text-2xl font-bold">광주</p>
                  <p>GWANGJU</p>
                </CityCardBox>
                <CityCardBox color="blue">
                  <p className="text-2xl font-bold">대구</p>
                  <p>DAEGU</p>
                </CityCardBox>
                <CityCardBox color="green">
                  <p className="text-2xl font-bold">부산</p>
                  <p>BUSAN</p>
                </CityCardBox>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <h3 className="text-2xl font-bold flex items-center">
              <RiGitCommitLine className="mr-0.5" />
              변경 내역
            </h3>
            <div className="mt-2">
              {commits.map((commit) => (
                <div key={commit.sha} className="flex items-center">
                  <a
                    className="mb-0.5 hover:text-gray-600"
                    href={commit.html_url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="show commit in github"
                  >
                    {commit.commit.message}
                  </a>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-10 py-10">
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Daegyeom Ha. All rights reserved.
            <br />
            <a
              className="hover:text-gray-600"
              href="https://github.com/SkyLightQP/marble/"
              target="_blank"
              rel="noreferrer"
            >
              View source on <RiGithubFill className="inline text-base" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
