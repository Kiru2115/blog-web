import bookOpenIcon from "@/assets/icons/book-open.svg";
import cameraIcon from "@/assets/icons/camera.svg";
import codeIcon from "@/assets/icons/code.svg";
import heartIcon from "@/assets/icons/heart.svg";
import newspaperIcon from "@/assets/icons/newspaper.svg";
import sendIcon from "@/assets/icons/send.svg";
import trophyIcon from "@/assets/icons/trophy.svg";
import userIcon from "@/assets/icons/user.svg";
import AchievementList from "@/components/about-me/AchievementList/AchievementList";
import ContactLinks from "@/components/about-me/ContactLinks/ContactLinks";
import IconTitle from "@/components/about-me/IconTitle/IconTitle";
import PhotoGallery from "@/components/about-me/PhotoGallery/PhotoGallery";
import ProfileHeader from "@/components/about-me/ProfileHeader/ProfileHeader";
import ProjectList from "@/components/about-me/ProjectList/ProjectList";
import SiteFooter from "@/components/about-me/SiteFooter/SiteFooter";
import TagList from "@/components/about-me/TagList/TagList";
import TextSection from "@/components/about-me/TextSection/TextSection";
import BlogSection from "@/components/blog/BlogSection/BlogSection";
import {
  ACHIEVEMENTS,
  AUTHOR_BIO,
  AUTHOR_NAME,
  AUTHOR_PORTRAIT,
  AUTHOR_TAGLINE,
  CONTACT_LINKS,
  CURRENTLY_LEARNING,
  HERO_LINKS,
  INTERESTS,
  PHOTOS,
  PHOTOS_SECTION_ID,
  PROJECTS,
} from "@/constants/about-me";

const Index = () => {
  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-8 sm:py-14">
        <ProfileHeader
          name={AUTHOR_NAME}
          tagline={AUTHOR_TAGLINE}
          portrait={AUTHOR_PORTRAIT}
          links={HERO_LINKS}
        />
        <TextSection
          title={<IconTitle icon={userIcon}>About me</IconTitle>}
          text={AUTHOR_BIO}
        />
        <BlogSection title={<IconTitle icon={newspaperIcon}>Blog</IconTitle>} />
        <TagList
          title={<IconTitle icon={heartIcon}>Interests</IconTitle>}
          tags={INTERESTS}
        />
        <AchievementList
          title={<IconTitle icon={trophyIcon}>Achievements</IconTitle>}
          achievements={ACHIEVEMENTS}
        />
        <TagList
          title={<IconTitle icon={bookOpenIcon}>Currently learning</IconTitle>}
          tags={CURRENTLY_LEARNING}
          variant="primary"
        />
        <ProjectList
          title={<IconTitle icon={codeIcon}>Projects</IconTitle>}
          projects={PROJECTS}
        />
        <PhotoGallery
          id={PHOTOS_SECTION_ID}
          title={<IconTitle icon={cameraIcon}>My photography</IconTitle>}
          photos={PHOTOS}
        />
        <ContactLinks
          title={<IconTitle icon={sendIcon}>Contact</IconTitle>}
          links={CONTACT_LINKS}
        />
      </main>
      <SiteFooter name={AUTHOR_NAME} year={new Date().getFullYear()} />
    </>
  );
};

export default Index;
