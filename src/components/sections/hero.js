import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hello, my name is</h1>;
  const two = <h2 className="big-heading">Aditya Patni.</h2>;
  const three = <h3 className="big-heading">I love challenging myself every day!</h3>;
  const four = (
    <>
      <p>
        I am a graduate student pursuing Masters in Computer Science at <a href="https://www.scu.edu/" target="_blank" rel="noreferrer">Santa Clara University</a>. 
      </p>
      <p>
        I have worked as a Software Engineer at <a href="https://phrazor.ai/" target="_blank" rel="noreferrer">vPhrase Analytics Pvt Ltd </a> for 3 years as a full-stack developer, and I am well-versed in <a href="#" target="_blank" rel="noreferrer">Python</a>, <a href="#" target="_blank" rel="noreferrer"> Java</a>, <a href="#" target="_blank" rel="noreferrer"> Docker</a>, <a href="#" target="_blank" rel="noreferrer"> Kubernetes </a>, <a href="#" target="_blank" rel="noreferrer"> ML frameworks</a>, and <a href="#" target="_blank" rel="noreferrer"> Linux</a> along with an in-depth understanding of <a href="#" target="_blank" rel="noreferrer">SQL/NoSQL</a> databases software systems.
      <p>
        I’m currently looking for <a href="#" target="_blank" rel="noreferrer">full time roles</a> in <a href="#" target="_blank" rel="noreferrer">Software/Data Engineering</a>domain. Please feel free to reach out to me if you find my skills and experience relevant to your position :)
      </p>
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:adipatni05@gmail.com"
      target="_blank"
      rel="noreferrer">
      Contact Me!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
