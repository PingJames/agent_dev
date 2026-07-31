import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "使用条款",
  description:
    "AI 工程师之路 使用条款。请仔细阅读本使用条款，了解您在使用本网站时的权利、义务及相关免责声明。",
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    id: "acceptance",
    title: "一、条款的接受",
    content: (
      <>
        <p>
          欢迎使用 AI 工程师之路（以下简称&ldquo;<strong>本站</strong>&rdquo;或&ldquo;<strong>我们</strong>&rdquo;）。本使用条款（以下简称&ldquo;<strong>本条款</strong>&rdquo;）是您与本站之间具有法律约束力的协议。
        </p>
        <p>
          一旦您访问、浏览或以任何方式使用本站，即表示您已阅读、理解并同意接受本条款的全部约定。如您不同意本条款的任何部分，请立即停止使用本站。
        </p>
        <p>
          请特别留意本条款中以<strong>加粗</strong>形式提示的免责声明及责任限制条款。
        </p>
      </>
    ),
  },
  {
    id: "service",
    title: "二、服务说明",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2.1 服务概述
        </h3>
        <p>
          本站是一个面向开发者的 AI 应用工程师学习平台，致力于通过系统化的学习路线、技术博客、项目实战和面试题库等内容，帮助用户掌握 LLM、RAG、AI Agent、Prompt Engineering 等前沿技术。本站所有内容均以知识分享与学习交流为目的。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2.2 服务特点
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>免费访问：</strong>大部分内容可免费浏览，无需注册账户。</li>
          <li><strong>内容驱动：</strong>以原创或经授权转载的技术文章、教程为主。</li>
          <li><strong>开放链接：</strong>部分内容可能引用或链接至第三方资源。</li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          2.3 服务提供方式
        </h3>
        <p>
          本站所有服务均以&ldquo;按原样&rdquo;（As Is）和&ldquo;按可用性&rdquo;（As Available）的方式提供。我们不保证服务不会中断、不存在错误或缺陷，也不对内容的准确性、完整性、及时性、适用性作出明示或暗示的保证。
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "三、用户资格",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          3.1 年龄要求
        </h3>
        <p>
          本站面向具有一定编程基础的开发者、学生及自学人群。如您是未成年人，请在监护人陪同下使用本站，并确保监护人已同意您接受本条款。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          3.2 地区限制
        </h3>
        <p>
          本站可供全球用户访问，但您有责任确保您对本站的使用符合您所在地区适用的法律法规。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          3.3 账户注册
        </h3>
        <p>
          本站当前大部分功能无需注册账户即可使用。如未来开放账户体系，您在注册时应提供真实、准确、完整的信息，并对账户活动负责。
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "四、用户行为规范",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          4.1 合法使用
        </h3>
        <p>您同意仅出于合法目的使用本站，并遵守所有适用的法律法规。您不得：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>使用本站从事任何违法或侵权活动；</li>
          <li>利用本站传播非法、有害、威胁、辱骂、骚扰、诽谤、淫秽或其他不当内容；</li>
          <li>侵犯他人的知识产权、隐私权或其他合法权益；</li>
          <li>传播恶意软件、病毒或其他有害代码；</li>
          <li>进行任何可能损害本站或其用户的行为。</li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          4.2 禁止的行为
        </h3>
        <p>您明确同意不会：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>破坏服务：</strong>尝试破坏、干扰或损害本站的正常运行，包括但不限于 DDoS 攻击、SQL 注入、XSS 攻击等；</li>
          <li><strong>过度访问：</strong>使用爬虫、机器人等自动化工具对本站进行过度抓取，造成服务器负载过高；</li>
          <li><strong>绕过安全措施：</strong>尝试绕过、禁用或干扰本站的安全功能；</li>
          <li><strong>冒充他人：</strong>冒充任何个人或实体，或虚假陈述您与任何个人或实体的关系；</li>
          <li><strong>未授权商用：</strong>在未获得明确书面授权的情况下，将本站内容大规模复制、镜像化或用于其他商业目的。</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    title: "五、知识产权",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          5.1 本站内容所有权
        </h3>
        <p>
          本站发布的所有原创内容（包括但不限于文章、教程、代码示例、设计、图形、图标、徽标、界面元素等）均受知识产权法保护，著作权归本站或相应作者所有，未经书面授权不得转载、复制、改编或用于其他商业用途。
        </p>
        <p>除非本条款明确允许，否则您不得：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>复制、修改、分发或创建本站内容的衍生作品；</li>
          <li>删除或修改任何版权声明或其他所有权标识；</li>
          <li>将本站原创内容用于商业目的。</li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          5.2 转载内容
        </h3>
        <p>
          本站部分内容可能转载自第三方，转载时已尽量注明来源及原作者。如转载内容侵犯了您的合法权益，请通过本站&ldquo;<Link href="/privacy" className="text-primary-600 hover:underline dark:text-primary-400">隐私政策</Link>&rdquo;中的联系方式告知，我们将在核实后及时处理。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          5.3 用户提交内容
        </h3>
        <p>
          如本站未来开放评论、投稿或社区互动功能，您提交的内容应保证拥有合法权利，且不侵犯任何第三方权益。您授予本站在全球范围内、免费、非独占地使用、展示、复制、改编您所提交内容的权利，仅用于本站的运营和推广。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          5.4 开源组件
        </h3>
        <p>
          本站代码中可能使用开源软件组件，这些组件受其各自的开源许可证约束。
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "六、免责声明",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          6.1 内容免责
        </h3>
        <p>
          本站所提供的技术文章、教程、代码示例、学习路线、面试题等内容仅供学习参考，不构成任何专业建议。我们不保证内容绝对准确、完整或适用于您的具体场景。<strong>请在将本站内容应用于生产环境或商业决策前，自行验证并咨询专业人士。</strong>
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          6.2 代码免责
        </h3>
        <p>
          本站提供的代码示例按&ldquo;原样&rdquo;提供，不提供任何明示或暗示的担保。您应自行评估代码的安全性、合规性及适用性，因使用本站代码而产生的任何直接或间接损失，本站不承担责任。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          6.3 第三方链接免责
        </h3>
        <p>
          本站可能包含指向第三方网站的链接或引用第三方内容。我们不对这些第三方网站或内容的可用性、准确性、完整性、合法性或安全性负责。访问第三方链接的风险由您自行承担。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          6.4 外部服务依赖
        </h3>
        <p>
          本站部分功能可能依赖第三方服务（如 CDN、统计分析、字体、图床等）。这些第三方服务的可用性、隐私政策及服务条款不受我们控制，您应自行查阅并遵守其相关规定。
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "七、责任限制",
    content: (
      <>
        <p>
          在适用法律允许的最大范围内，本站及其运营者、作者、合作方不对因使用或无法使用本站而产生的任何直接、间接、附带、特殊、惩罚性或后果性损害承担责任，包括但不限于：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>利润损失或数据丢失；</li>
          <li>设备或系统损坏；</li>
          <li>业务中断；</li>
          <li>替代服务或方案的采购成本；</li>
          <li>任何其他无形损失。</li>
        </ul>
        <p>
          即使我们已被告知此类损害的可能性，上述限制仍然适用。由于本站为免费提供的学习资源，我们对您承担的最大责任在法律允许的范围内将尽量予以限制。
        </p>
        <p>
          某些司法管辖区不允许排除或限制附带或后果性损害的责任，在此情况下，我们的责任将在法律允许的最大范围内受到限制。
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "八、赔偿",
    content: (
      <>
        <p>
          您同意赔偿、辩护并使本站及其运营者、作者、员工、代理人和关联方免受因以下情况引起的任何索赔、损失、责任、损害、成本和费用（包括合理的律师费）：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>您对本站的使用；</li>
          <li>您违反本条款；</li>
          <li>您侵犯任何第三方权利；</li>
          <li>您违反任何适用法律或法规；</li>
          <li>您提交、发布或传播的任何内容。</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    title: "九、服务变更与终止",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          9.1 服务变更
        </h3>
        <p>
          我们保留随时修改、暂停或终止本站任何部分的权利，无需提前通知，包括但不限于新增或下线功能、调整内容结构、更改界面或技术架构等。我们不对因服务变更而产生的任何损失承担责任。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          9.2 服务终止
        </h3>
        <p>
          我们可出于任何原因（包括但不限于您违反本条款）终止或暂停您对本站的访问权限，无需事先通知且无需承担任何责任。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          9.3 终止后的效力
        </h3>
        <p>
          本条款中按其性质应在终止后继续有效的条款将继续有效，包括但不限于知识产权条款、免责声明、赔偿和责任限制等。
        </p>
      </>
    ),
  },
  {
    id: "dispute",
    title: "十、争议解决",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          10.1 适用法律
        </h3>
        <p>
          本条款及您与本站之间的关系受中华人民共和国法律管辖，不考虑其法律冲突原则。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          10.2 争议解决程序
        </h3>
        <p>
          因本条款引起的或与之相关的任何争议，双方应首先尝试通过友好协商解决。如协商未能在三十（30）天内解决争议，任何一方均可将争议提交至有管辖权的人民法院诉讼解决。
        </p>
      </>
    ),
  },
  {
    id: "amendments",
    title: "十一、条款变更",
    content: (
      <>
        <p>
          我们保留随时修改本条款的权利。修改后的条款将在本页面公布后立即生效。我们鼓励您定期查看本页面以了解最新条款。
        </p>
        <p>
          对于重大变更，我们可能会在网站显著位置发布公告。继续使用本站即表示您接受修改后的条款；如您不同意，请停止使用本站。
        </p>
      </>
    ),
  },
  {
    id: "misc",
    title: "十二、其他条款",
    content: (
      <>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          12.1 完整协议
        </h3>
        <p>
          本条款构成您与本站之间关于使用本站的完整协议，取代之前关于该主题的所有口头或书面约定。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          12.2 可分割性
        </h3>
        <p>
          如本条款的任何条款被认定为无效或不可执行，该条款将在必要的最小范围内进行修改以使其有效，其余条款将继续完全有效。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          12.3 弃权
        </h3>
        <p>
          我们未能执行本条款的任何权利或规定不构成对该权利或规定的放弃。对任何违约行为的放弃不构成对任何后续违约行为的放弃。
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          12.4 联系方式
        </h3>
        <p>
          如您对本使用条款有任何疑问、意见或建议，可通过以下方式与我们取得联系：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            联系邮箱：<a href="mailto:574291562@qq.com" className="text-primary-600 hover:underline dark:text-primary-400">574291562@qq.com</a>
          </li>
          <li>备案信息：粤ICP备2023124211号</li>
        </ul>
        <p>
          更详细的隐私处理规则请参阅&ldquo;<Link href="/privacy" className="text-primary-600 hover:underline dark:text-primary-400">隐私政策</Link>&rdquo;。
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            使用条款
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            请仔细阅读以下使用条款。访问或使用本站即表示您已同意接受本条款的约束。
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            最后更新日期：2026 年 7 月 31 日
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                目录
              </h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-slate-500 hover:text-primary-600 transition-colors dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-3 max-w-3xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
