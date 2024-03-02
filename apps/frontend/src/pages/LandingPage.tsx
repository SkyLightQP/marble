import { FC, useEffect, useState } from 'react';
import { RiExternalLinkFill, RiGamepadFill, RiGithubFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'redaxios';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import Image from '@/images/thumb.png';

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
    <>
      <div className="mb-20 pt-20 px-40 flex justify-between items-center">
        <div>
          <Logo className="text-4xl -ml-1" />
          <p className="text-2xl font-bold">웹에서 주사위 보드게임을 플레이 해보세요!</p>
        </div>
        <div>
          <Button
            className="w-60 h-16 text-xl font-bold flex justify-center items-center bg-cyan-500 hover:bg-cyan-600"
            onClick={() => navigate('/rooms')}
          >
            <RiGamepadFill className="mr-2" /> 게임 시작
          </Button>
        </div>
      </div>

      <div className="mb-20 flex flex-col items-center relative">
        <div className="absolute bg-cover w-full h-full -z-50 blur-md" style={{ backgroundImage: `url(${Image})` }} />
        <img src={Image} width={960} alt="게임화면 미리보기" />
      </div>

      <div className="px-40 mb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          최근 커밋{' '}
          <a
            className="ml-2 hover:text-gray-600"
            href="https://github.com/SkyLightQP/marble/"
            target="_blank"
            rel="noreferrer"
            aria-label="github"
          >
            <RiGithubFill />
          </a>
        </h1>
        <div>
          {commits.map((commit) => (
            <div
              key={commit.sha}
              className="flex items-center border-2 border-gray-200 px-4 py-4 border-b-0 first:rounded-t-md last:rounded-b-md last:border-b-2"
            >
              <p className="font-medium">{commit.commit.message}</p>
              <a
                className="ml-1 hover:text-gray-600"
                href={commit.html_url}
                target="_blank"
                rel="noreferrer"
                aria-label="show commit in github"
              >
                <RiExternalLinkFill />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
