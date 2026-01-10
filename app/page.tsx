import Header from "@/components/Header";
import PolicyCard from "@/components/PolicyCard";
import { getSortedPropertiesData } from "@/lib/policies";

export default function Home() {
  const policies = getSortedPropertiesData();

  return (
    <>
      <Header />
      <main>
        <div className="relative -top-[10px] flex flex-col gap-8">
          {policies.length === 0 ? (
            <p>No policies yet. Create your first property in content/policies/</p>
          ) : (
            policies.map((property) => (
              <PolicyCard key={property.slug} {...property} />
            ))
          )}
        </div>
      </main>
    </>
  );
}
